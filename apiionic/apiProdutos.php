<?php

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);


if($postjson['requisicao'] == 'add'){

    

    $query = $pdo->prepare("INSERT INTO produtos SET nomeProduto = :nomeProduto, categoria = :categoria, valor = :valor, idUsuario = :idUsuario, urlImagem = :urlImagem, unidadeMedida = :unidadeMedida, qtMinimaPedido = :qtMinimaPedido, qtEstoque = :qtEstoque ");
  
       $query->bindValue(":nomeProduto", $postjson['nomeProduto']);
       $query->bindValue(":categoria", $postjson['categoria']);
       $query->bindValue(":valor", $postjson['valor']);
       $query->bindValue(":idUsuario", $postjson['idUsuario']);
       $query->bindValue(":urlImagem", $postjson['urlImagem']);
       $query->bindValue(":unidadeMedida", $postjson['unidadeMedida']);
       $query->bindValue(":qtMinimaPedido", $postjson['qtMinimaPedido']);
       $query->bindValue(":qtEstoque", $postjson['qtEstoque']);
       $query->execute();
  
       $id = $pdo->lastInsertId();
       
  
      if($query){
        $result = json_encode(array('success'=>true, 'id'=>$id));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }
     echo $result;





    
}else if($postjson['requisicao'] == 'listar'){

    if($postjson['nomeProduto'] == ''){
        $query = $pdo->query("SELECT * from produtos order by id desc limit $postjson[start], $postjson[limit]");
    }else{
      $busca = $postjson['nomeProduto'] . '%';
      $query = $pdo->query("SELECT * from produtos where nomeProduto LIKE '$busca' or categoria LIKE '$busca' order by id desc limit $postjson[start], $postjson[limit]");
    }


    $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }
 		$dados[] = array(
 			'id' => $res[$i]['id'],
 			'nomeProduto' => $res[$i]['nomeProduto'],
			'categoria' => $res[$i]['categoria'],
            'valor' => $res[$i]['valor'],
            'idUsuario' => $res[$i]['idUsuario'],
            'urlImagem' => $res[$i]['urlImagem'],
            'unidadeMedida' => $res[$i]['unidadeMedida'],
            'qtMinimaPedido' => $res[$i]['qtMinimaPedido'],
            'qtEstoque' => $res[$i]['qtEstoque'],
            
        
 		);

 }

        if(count($res) > 0){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false, 'result'=>'0'));

            }
            echo $result;

}




elseif($postjson['requisicao'] == 'editar'){
    


    $query = $pdo->prepare("UPDATE produtos SET nomeProduto = :nomeProduto, categoria = :categoria, valor = :valor, urlImagem = :urlImagem,unidadeMedida = :unidadeMedida, qtMinimaPedido = :qtMinimaPedido, qtEstoque = :qtEstoque  where id = :id");
  
       $query->bindValue(":nomeProduto", $postjson['nomeProduto']);
       $query->bindValue(":categoria", $postjson['categoria']);
       $query->bindValue(":valor", $postjson['valor']);
       $query->bindValue(":urlImagem", $postjson['urlImagem']);
       $query->bindValue(":id", $postjson['id']);
       $query->bindValue(":unidadeMedida", $postjson['unidadeMedida']);
       $query->bindValue(":qtMinimaPedido", $postjson['qtMinimaPedido']);
       $query->bindValue(":qtEstoque", $postjson['qtEstoque']);
       $query->execute();
  
       $id = $pdo->lastInsertId();
       
  
      if($query){
        $result = json_encode(array('success'=>true, 'id'=>$id));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }
     echo $result;

    }




    elseif($postjson['requisicao'] == 'excluir'){
    
            
        $query = $pdo->query("DELETE FROM produtos where id = '$postjson[id]'");
      
                 
      
          if($query){
            $result = json_encode(array('success'=>true));
      
            }else{
            $result = json_encode(array('success'=>false));
        
            }
         echo $result;
    
        }

?>