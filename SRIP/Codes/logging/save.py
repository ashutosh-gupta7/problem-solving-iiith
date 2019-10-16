class SaveLog():
    def save_to_db(data):
        print(data['code'])
        print(data['language'])
        print(data['codeId'])
        conn.execute("INSERT INTO log_history_table (id, time, code, language, problemid) VALUES (1,'10',data['code'],data['language'],data['codeId'])")
 
        
    