import json
import sqlite3
from sqlite3 import Error


def create_connection(path):
    connection = None
    try:
        connection = sqlite3.connect(path)
        print("Connection to SQLite DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection


connection = create_connection(".\\sm_app.sqlite")

def execute_query(query):
    connection = create_connection(".\\sm_app.sqlite")
    cursor = connection.cursor()

    try:
        cursor.execute(query)
        connection.commit()
        print("Query executed successfully")
    except Error as e:
        print(f"The error '{e}' occurred")
    
    connection.close()

def return_query(connection, query):
    row = []
    connection = create_connection(".\\sm_app.sqlite")
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print("Query executed successfully")
        row = cursor.fetchone()
    except Error as e:
        print(f"The error '{e}' occurred")
    
    connection.close()
    
    
    return row


def startDB():
    print("DB Started")

    f = open(r"tables.json")
 
    data = json.load(f)
 
    for tabela in data:
        nome = tabela['Nome']
        fields = "("
        for campo in tabela["Campos"]:
            if(campo == "ID"):
                fields = fields + "ID INTEGER PRIMARY KEY ASC ON CONFLICT ABORT AUTOINCREMENT"
            else:
                fields = fields + ", " + campo + " " + tabela["Campos"][campo]
        
        fields = fields + ")"
        query = f"CREATE TABLE IF NOT EXISTS {nome} " 
        query = query + fields
        execute_query(query)
        
    f.close()    
    f = open(r"partnumber.json")
    data = json.load(f)
    values = '("00000-00000-00","TDB","W","DUMMY PART", 0000, "WZ", "OVF")'
    query = 'SELECT * from partnumber where PartNumber = "00000-00000-00"'
    
    if return_query(connection,query) == None:
        for part in data:
            value = f' , ("{part["PartNumber"]}", "{part["Exporter"]}" ,"{part["Renban"]}","{part["PartName"]}",{part["Back"]},"{part["Mod"]}","{part["ModDestino"]}")'
            values += value       
            
        query = f"insert into partnumber (PartNumber, Exporter,Renban,PartName,Back,Mod,Destino) VALUES {values}"    
        #print(query)
        execute_query(query)


    connection.close()


def insertPeca():
    0


startDB()
