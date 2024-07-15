# from langchain_community.vectorstores import Chroma
# __import__('pysqlite3')
# import pysqlite3
# import sys
# sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')
# from langchain.vectorstores import Chroma
from langchain_chroma import Chroma
from langchain.chat_models import ChatOpenAI
# from langchain_community.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_community.llms import OpenAI  # Updated
from langchain_community.chat_models import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA,ConversationalRetrievalChain
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import DirectoryLoader
from langchain.prompts import SystemMessagePromptTemplate, ChatPromptTemplate,HumanMessagePromptTemplate
from langchain_community.embeddings.llamacpp import LlamaCppEmbeddings
from langchain_core.runnables import RunnablePassthrough, RunnablePick
from langchain_core.output_parsers import StrOutputParser
import os
from langchain.memory import ConversationBufferMemory
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_community.llms import LlamaCpp
from langchain import hub
class RAG():
    def __init__(self, local=True):
        if not local:
            os.environ["OPENAI_API_KEY"] = "sk-proj-4VB8Y9qADQGEtD6fgPHjT3BlbkFJH9pmuoo56twYeq5So4tY"
            self.llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.7)
            self.llm_embedding =OpenAIEmbeddings()
        else:
            self.llm = LlamaCpp(
                model_path="/projects/CIBCIGroup/00DataUploading/Liang/LLMs/llama-2-7b-chat.Q5_K_M.gguf",
                n_gpu_layers=1,
                n_batch=512,
                n_ctx=2048,
                f16_kv=True,
                verbose=True,
                embeddings=True
            )
            self.llm_embedding = SentenceTransformerEmbeddings(model_name="paraphrase-MiniLM-L6-v2")
        
        self.memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True, output_key='answer')
        self.vectordb = self.load_and_saveDB('./my_docs')
        self.retriever = self.vectordb.as_retriever()

        self.rag_prompt = hub.pull("rlm/rag-prompt")
        # custmize the rag prompt
        PROMT_TEMPLATE="""You are an assistant for helping an user to understand Liang Ou. Use the following pieces of retrieved context about Liang Ou to answer the question. If you don't know the answer, just say exact "I don't know.". If the context is irrelevant to the question, just say exact "Bad context.". Use three sentences maximum and keep the answer concise.
        Question: {question} 
        Context: {context} 
        Answer:"""
        
        self.rag_prompt.messages[0].prompt.template=PROMT_TEMPLATE
        self.chain=(
            {"context": self.retriever, "question": RunnablePassthrough()}
            | self.rag_prompt
            | self.llm
            | StrOutputParser()
        )
    def load_and_saveDB(self,dir):
        loader = DirectoryLoader(dir, glob="./*.pdf", loader_cls=PyPDFLoader)
        docs=loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        all_splits = text_splitter.split_documents(docs)
        vectordb = Chroma.from_documents(documents=all_splits, embedding=self.llm_embedding,persist_directory="./db/")
        return vectordb
    def get_response(self, question):
        for i in range(5):
            llm_response = self.chain.invoke(question)
            output=llm_response
            if 'Bad context' not in output:
                break
            self.memory.clear()
        # print("response: ",llm_response)
        return output
        # return llm_response
    def clear_memory(self):
        self.memory.clear()