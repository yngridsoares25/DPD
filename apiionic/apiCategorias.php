<?php

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);


if($postjson['requisicao'] == 'add'){


    $query = $pdo->prepare("INSERT INTO categorias SET  nomeCategoria = :nomeCategoria");
  
       
       $query->bindValue(":nomeCategoria", $postjson['nomeCategoria']);
       $query->execute();
       //print_r($query->errorInfo());
       $id = $pdo->lastInsertId();
       
  
      if($query){
        $result = json_encode(array('success'=>true, 'id'=>$id));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }
     echo $result;





    
}else if($postjson['requisicao'] == 'listar'){

    if($postjson['nome'] == ''){
        $query = $pdo->query("SELECT * from categorias order by id desc limit $postjson[start], $postjson[limit]");
    }else{
      $busca = '%' . $postjson['nome'] . '%';
      $query = $pdo->query("SELECT * from categorias where nomeCategoria LIKE '$busca'  order by id desc limit $postjson[start], $postjson[limit]");
    }


    $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }
 		$dados[] = array(
 			'id' => $res[$i]['id'],
 			'nomeCategoria' => $res[$i]['nomeCategoria'],
			           
        
 		);

 }

        if(count($res) > 0){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

}else if($postjson['requisicao'] == 'editar'){

    $query = $pdo->prepare("UPDATE categorias SET nomeCategoria = :nomeCategoria where id = :id");
  
    $query->bindValue(":nomeCategoria", $postjson['nomeCategoria']);
    $query->bindValue(":id", $postjson['id']);
    $query->execute();

    $id = $pdo->lastInsertId();
    

   if($query){
     $result = json_encode(array('success'=>true, 'id'=>$id));

     }else{
     $result = json_encode(array('success'=>false));
 
     }
  echo $result;




}else if($postjson['requisicao'] == 'excluir'){

    $query = $pdo->query("DELETE FROM categorias where id = '$postjson[id]'");
      
                 
      
    if($query){
      $result = json_encode(array('success'=>true));

      }else{
      $result = json_encode(array('success'=>false));
  
      }
   echo $result;





}


     

?>