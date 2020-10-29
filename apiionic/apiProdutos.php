<?php

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);


if($postjson['requisicao'] == 'add'){

    

    $query = $pdo->prepare("INSERT INTO produtos SET nomeProduto = :nomeProduto, categoria = :categoria, valor = :valor, idFornecedor = :idFornecedor, urlImagem = :urlImagem, unidadeMedida = :unidadeMedida, qtMinimaPedido = :qtMinimaPedido, qtEstoque = :qtEstoque ");
  
       $query->bindValue(":nomeProduto", $postjson['nomeProduto']);
       $query->bindValue(":categoria", $postjson['categoria']);
       $query->bindValue(":valor", $postjson['valor']);
       $query->bindValue(":idFornecedor", $postjson['idFornecedor']);
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

    $idUsuario= $postjson['idUsuario'];
    $nivelUsuario = $postjson['nivelUsuario'];

    if($nivelUsuario =='Cliente'){
         if($postjson['nomeProduto'] == ''){
          $query = $pdo->query("SELECT prod.*, usr.nome as nomeVendedor from produtos as prod join usuarios usr on prod.idFornecedor = usr.id order by categoria,idProduto desc limit $postjson[start], $postjson[limit]");
        }else{
          $busca = $postjson['nomeProduto'] . '%';
          $query = $pdo->query("SELECT prod.*, usr.nome as nomeVendedor from produtos as prod join usuarios usr on prod.idFornecedor = usr.id where nomeProduto  LIKE '$busca' or categoria LIKE '$busca'  order by categoria,idProduto desc limit $postjson[start], $postjson[limit]");
        }

    }else{
        if($postjson['nomeProduto'] == ''){
            $query = $pdo->query("SELECT prod.*, usr.nome as nomeVendedor from  produtos as prod join usuarios usr on prod.idFornecedor = usr.id  where  idFornecedor = $idUsuario order by categoria,idProduto desc limit $postjson[start], $postjson[limit]");
        }else{
          $busca = $postjson['nomeProduto'] . '%';
          $query = $pdo->query("SELECT prod.*, usr.nome as nomeVendedor from  produtos as prod join usuarios usr on prod.idFornecedor = usr.id where nomeProduto  LIKE '$busca' or categoria LIKE '$busca' AND idFornecedor = $idUsuario order by categoria,idProduto desc limit $postjson[start], $postjson[limit]");
        }
    }


    $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }
 		$dados[] = array(
 			'idProduto' => $res[$i]['idProduto'],
 			'nomeProduto' => $res[$i]['nomeProduto'],
			'categoria' => $res[$i]['categoria'],
            'valor' => $res[$i]['valor'],
            'idFornecedor' => $res[$i]['idFornecedor'],
            'urlImagem' => $res[$i]['urlImagem'],
            'unidadeMedida' => $res[$i]['unidadeMedida'],
            'qtMinimaPedido' => $res[$i]['qtMinimaPedido'],
            'nomeVendedor' => $res[$i]['nomeVendedor'],
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
    


    $query = $pdo->prepare("UPDATE produtos SET nomeProduto = :nomeProduto, categoria = :categoria, valor = :valor, urlImagem = :urlImagem,unidadeMedida = :unidadeMedida, qtMinimaPedido = :qtMinimaPedido, qtEstoque = :qtEstoque  where idProduto = :idProduto");
  
       $query->bindValue(":nomeProduto", $postjson['nomeProduto']);
       $query->bindValue(":categoria", $postjson['categoria']);
       $query->bindValue(":valor", $postjson['valor']);
       $query->bindValue(":urlImagem", $postjson['urlImagem']);
       $query->bindValue(":idProduto", $postjson['idProduto']);
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


            
        $query = $pdo->query("DELETE FROM produtos where idProduto = '$postjson[idProduto]'");
      
                 
      
          if($query){
            $result = json_encode(array('success'=>true));
      
            }else{
            $result = json_encode(array('success'=>false));
        
            }
         echo $result;
    
        }



      else if($postjson['requisicao'] == 'contarProduto'){


        $idUsuario= $postjson['idUsuario'];
        $nivelUsuario = $postjson['nivelUsuario'];

        if($nivelUsuario =='Cliente'){
            $query = $pdo->query("SELECT count(idProduto) as qtProduto from produtos");
        }else{

             $query = $pdo->query("SELECT count(idProduto) as qtProduto from produtos where idFornecedor = $idUsuario");
        }
    
        $res = $query->fetchAll(PDO::FETCH_ASSOC);
    
       for ($i=0; $i < count($res); $i++) { 
          foreach ($res[$i] as $key => $value) {
          }
         $dados[] = array(
           'qtProduto' => $res[$i]['qtProduto'],
         );
    
     }
    
            if(count($res) > 0){
                    $result = json_encode(array('success'=>true, 'result'=>$dados));
    
                }else{
                    $result = json_encode(array('success'=>false, 'result'=>'0'));
    
                }
                echo $result;
    
    }
    
    
?>