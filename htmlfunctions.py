import DB
import json

def returnBoxData(partnumber):
    query = f'SELECT * from partnumber where PartNumber = "{partnumber}"'
    response = DB.return_query(DB.connection, query)
    dataResponse = {
        "PartNumber": response[1],
            "Exporter": response[2],
            "Renban": response[3],
            "PartName": response[4],
            "Back": response[5],
            "Mod": response[6],
            "Destino": response[7]
    }
    
    return json.dumps(dataResponse)

def fechaModulo(caixas):
    
    
    values = "('-','-')"
    for caixa in caixas:
        values += f",('{caixa[0]}','{caixa[1]}')"
    
    
    querry = f'insert into conteudomodulo (Mod, PartNumber) VALUES {values}'
    print(querry)
    
    DB.execute_query(querry)
        
    dataResponse = {
        "Status": 1
    }
    
    return json.dumps(dataResponse)
    
