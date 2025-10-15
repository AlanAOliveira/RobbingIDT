from http.server import HTTPServer as BaseHTTPServer, SimpleHTTPRequestHandler
import simplejson
import os
import data as dados
import htmlfunctions
import ssl
import socket
import DB

class HTTPHandler(SimpleHTTPRequestHandler):
    
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def translate_path(self, path):
        path = SimpleHTTPRequestHandler.translate_path(self, path)
        relpath = os.path.relpath(path, os.getcwd())
        fullpath = os.path.join(self.server.base_path, relpath)
        return fullpath

    def do_HEAD(self):
        self._set_headers()

    def do_POST(self):
        self._set_headers()
        print("in post method")
        self.data_string = self.rfile.read(int(self.headers['Content-Length']))

        #self.send_response(200)
        self.end_headers()
        data = simplejson.loads(self.data_string)
        print(data["function"])

        if data["function"] == "getPartNumber":
            self.wfile.write(
                bytes(htmlfunctions.returnBoxData(data["dados"]), "utf-8"))
            return
        
        if data["function"] == "fechaModulo":
            self.wfile.write(
                bytes(htmlfunctions.fechaModulo(data["dados"]), "utf-8"))
            return
        
        else:
            with open("for_presen.py", 'rb') as f:
                self.wfile.write(f.read())
            return
         
class HTTPServer(BaseHTTPServer):

    def __init__(self,
                 base_path,
                 server_address,
                 RequestHandlerClass=HTTPHandler):
        self.base_path = base_path
        BaseHTTPServer.__init__(self, server_address, RequestHandlerClass)


web_dir = os.path.join(os.path.dirname(__file__), 'web')
httpd = HTTPServer(web_dir, (socket.gethostname(), 8282))
print(socket.gethostname())
httpd.serve_forever()
