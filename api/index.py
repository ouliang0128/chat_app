# export PATH=/usr/local/cuda-12.1/bin:$PATH
# export LD_LIBRARY_PATH=/usr/local/cuda-12.1/lib64:/usr/local/cuda-12.1/extras/CUPTI/lib64:$LD_LIBRARY_PATH
__import__('pysqlite3')
import sys
sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from rag import RAG
import mlflow
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow all origins for routes starting with /api

# Add the paths to LD_LIBRARY_PATH
cuda_paths = "/usr/local/cuda-12.1/lib64:/usr/local/cuda-12.1/extras/CUPTI/lib64"
os.environ["LD_LIBRARY_PATH"] = cuda_paths + ":" + os.environ.get("LD_LIBRARY_PATH", "")

# Add the CUDA bin directory to the PATH
cuda_bin_path = "/usr/local/cuda-12.1/bin"
os.environ["PATH"] = cuda_bin_path + ":" + os.environ.get("PATH", "")

# mlflow.set_tracking_uri(uri="http://localhost:8080")
# # Create a new experiment that the model and the traces will be logged to
# mlflow.set_experiment("LangChain Tracing")

# # Enable LangChain autologging
# # Note that models and examples are not required to be logged in order to log traces.
# # Simply enabling autolog for LangChain via mlflow.langchain.autolog() will enable trace logging.
# mlflow.langchain.autolog(log_models=True, log_input_examples=True)


local_rag = RAG(local=True)
@app.route('/api/process_question', methods=['POST'])
def process_question():
    data = request.get_json()
    question = data['question']
    answer = local_rag.get_response(question)
    return jsonify({'answer': answer})

@app.route('/api/clear_memory', methods=['POST'])
def clear_memory():
    local_rag.clear_memory()
    return jsonify({'status': 'Memory cleared'})

if __name__ == "__main__":
    app.run(debug=True, port=5328)
