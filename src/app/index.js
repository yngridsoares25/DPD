const fs = require ( 'fs' ); const readline = require ( 'readline' ); const { google } = require ( 'googleapis' ); // Se modificar esses escopos, exclua token.json. const SCOPES = [ 'https://www.googleapis.com/auth/drive.metadata.readonly' ]; // O arquivo token.json armazena os tokens de acesso e atualização do usuário e // é criado automaticamente quando o fluxo de autorização é concluído pela primeira // vez. const TOKEN_PATH

  


 



= 'token.json' ; // Carrega os segredos do cliente de um arquivo local. fs . readFile ( 'credentials.json' , ( err , content ) => { if ( err ) return console . log ( 'Erro ao carregar arquivo secreto do cliente:' , err ); // Autorizar um cliente com credenciais e chamar o Google Drive . API   autorizar ( JSON . parse ( conteúdo ), ListFiles ); }); / ** 


   
    
  




 * Crie um cliente OAuth2 com as credenciais fornecidas e execute a 
 * função de retorno de chamada fornecida. 
 * @param {Object} credentials As credenciais do cliente de autorização. 
 * @param {function} callback O callback para chamar com o cliente autorizado. 
 * / autorizar função ( credenciais , retorno de chamada ) { const { client_secret , client_id , redirect_uris } = credenciais . instalado ; const oAuth2Client = new google . auth . OAuth2
 
    
   ( 
      client_id , client_secret , redirect_uris [ 0 ]); // Verifique se já armazenamos um token.   fs . readFile ( TOKEN_PATH , ( err , símbolo ) => { se ( err ) retornar getAccessToken ( oauth2client , callback );     oauth2client . setCredentials ( JSON . parse ( símbolo ));     callback (

  
   
      

oAuth2Client ); }); } / **  * Obtenha e armazene o novo token após solicitar a autorização do usuário e, em seguida,  * execute o retorno de chamada fornecido com o cliente OAuth2 autorizado.  * @param {google.auth.OAuth2} oAuth2Client O cliente OAuth2 para o qual obter o token.  * @param {getEventsCallback} callback O callback para o cliente autorizado.  * / function getAccessToken ( oAuth2Client , callback ) { const authUrl = oAuth2Client . generateAuthUrl ({     access_type : 'offline' ,     escopo :
  








 
  
 
SCOPES , });   console . log ( 'Autorizar este aplicativo visitando este url:' , authUrl ); const rl = readline . createInterface ({     entrada : processo . stdin ,     saída : processo . stdout , });   rl . question ( 'Insira o código dessa página aqui:' , ( código ) => {     rl . close ();
  

  


  
   

    oAuth2Client . getToken ( code , ( err , token ) => { if ( err ) return console . error ( 'Erro ao recuperar token de acesso' , err );       oAuth2Client . setCredentials ( token ); // Armazene o token em disco para execuções posteriores do programa       fs . writeFile ( TOKEN_PATH , JSON . stringify ( token ), (   
        

      
 err ) => { if ( err ) retornar console . erro ( errar );         console . log ( 'Token armazenado em' , TOKEN_PATH ); });       retorno de chamada ( oAuth2Client ); }); }); } / **  * Lista os nomes e IDs de até 10 arquivos.  * @param {google.auth.OAuth2} auth Um cliente OAuth2 autorizado.  * / function listFiles ( auth ) { const drive =  
          

      

    
  






 
  google . unidade ({ versão : 'v3' , auth });   dirigir . arquivos . list ({     pageSize : 10 ,     fields : 'nextPageToken, files (id, name)' , }, ( err , res ) => { if ( err ) return console . log ( 'A API retornou um erro:' + err ) ; const files = res 

 
 
     
       
    . dados . arquivos ; if ( arquivos . comprimento ) {       console . log ( 'Arquivos:' );       arquivos . map (( arquivo ) => {         console . log (` $ { arquivo . nome } ( $ { arquivo . id })`); }); } else {       console . log ( 'Nenhum arquivo encontrado.'
      

  
 
      
      
); } }); }
    
  