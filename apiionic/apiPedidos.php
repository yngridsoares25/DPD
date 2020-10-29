<?php

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);


function format($date){
	return  date('Y-m-d',strtotime(str_replace('/', '-', $date)));
}


function formatHora($hora){
	return  date('H:i',strtotime($hora));
}


if($postjson['requisicao'] == 'add'){

    

    $query = $pdo->prepare("INSERT INTO pedidos SET idProduto = :idProduto, qtProduto = :qtProduto, data_inicial = :data_inicial, data_final = :data_final, idUsuarioComprador = :idUsuarioComprador, idFornecedor = :idFornecedor, horario_entrega_1 = :horario_entrega_1, horario_entrega_2 = :horario_entrega_2,endereco = :endereco, cidade =:cidade, estado = :estado, cep = :cep ");
  
       $query->bindValue(":idProduto", $postjson['idProduto']);
       $query->bindValue(":qtProduto", $postjson['qtProduto']);
       $query->bindValue(":data_inicial", format($postjson['data_inicial']));
       $query->bindValue(":data_final", format($postjson['data_final']));
       $query->bindValue(":idUsuarioComprador", $postjson['idUsuarioComprador']);
       $query->bindValue(":idFornecedor", $postjson['idFornecedor']);
       $query->bindValue(":horario_entrega_1", $postjson['horario_entrega_1']);
       $query->bindValue(":horario_entrega_2", $postjson['horario_entrega_2']);
       $query->bindValue(":endereco", $postjson['endereco']);
       $query->bindValue(":cidade", $postjson['cidade']);
       $query->bindValue(":estado", $postjson['estado']);
       $query->bindValue(":cep", $postjson['cep']);
       $query->execute();
  
       $id = $pdo->lastInsertId();
       
  
      if($query){
        $result = json_encode(array('success'=>true, 'idPedido'=>$id));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }
     echo $result;





    
}else if($postjson['requisicao'] == 'listar'){

  
  $idUsuario= $postjson['idUsuario'];
  $nivelUsuario = $postjson['nivelUsuario'];


  if($nivelUsuario =='Cliente'){
  
      if($postjson['data_inicial'] == '' and  $postjson['data_final'] == ''){
    
          $query = $pdo->query("SELECT pd.*,pt.categoria,pt.nomeProduto,pt.valor,pt.urlImagem,pt.unidadeMedida,usc.nome as nome_usuario_comprador, usv.nome as usuario_vendedor,pt.qtMinimaPedido, pt.qtEstoque from pedidos as pd join produtos as pt on pd.idProduto = pt.idProduto join usuarios usc on pd.idUsuarioComprador = usc.id join usuarios usv on pt.idFornecedor = usv.id where  pd.idUsuarioComprador = $idUsuario  order by pd.idPedido desc limit $postjson[start], $postjson[limit]");
          
      }else{
          
        $data_inicial = format($postjson['data_inicial']);
        $data_final = format($postjson['data_final']);
        $query = $pdo->query("SELECT pd.*,pt.categoria,pt.nomeProduto,pt.valor,pt.urlImagem,pt.unidadeMedida,usc.nome as nome_usuario_comprador, usv.nome as usuario_vendedor,pt.qtMinimaPedido, pt.qtEstoque from pedidos as pd join produtos as pt on pd.idProduto = pt.idProduto join usuarios usc on pd.idUsuarioComprador = usc.id join usuarios usv on pt.idFornecedor = usv.id where data_inicial >= $data_inicial and data_final =< $data_final and pd.idUsuarioComprador =$idUsuario  order by pd.idPedido desc limit $postjson[start], $postjson[limit]");
      }
      
    }else{

      if($postjson['data_inicial'] == '' and  $postjson['data_final'] == ''){
        $query = $pdo->query("SELECT pd.*,pt.categoria,pt.nomeProduto,pt.valor,pt.urlImagem,pt.unidadeMedida,usc.nome as nome_usuario_comprador, usv.nome as usuario_vendedor,pt.qtMinimaPedido, pt.qtEstoque from pedidos as pd join produtos as pt on pd.idProduto = pt.idProduto join usuarios usc on pd.idUsuarioComprador = usc.id join usuarios usv on pt.idFornecedor = usv.id where pd.idFornecedor =$idUsuario order by pd.idPedido desc limit $postjson[start], $postjson[limit]");
        }else{
          $data_inicial = format($postjson['data_inicial']);
          $data_final = format($postjson['data_final']);
          $query = $pdo->query("SELECT pd.*,pt.categoria,pt.nomeProduto,pt.valor,pt.urlImagem,pt.unidadeMedida,usc.nome as nome_usuario_comprador, usv.nome as usuario_vendedor,pt.qtMinimaPedido, pt.qtEstoque from pedidos as pd join produtos as pt on pd.idProduto = pt.idProduto join usuarios usc on pd.idUsuarioComprador = usc.id join usuarios usv on pt.idFornecedor = usv.id where data_inicial >= $data_inicial and data_final =< $data_final and pd.idFornecedor =$idUsuario order by pd.idPedido desc limit $postjson[start], $postjson[limit]");
        }


    }

    $res = $query->fetchAll(PDO::FETCH_ASSOC);

 	for ($i=0; $i < count($res); $i++) { 
      foreach ($res[$i] as $key => $value) {
      }
 		$dados[] = array(
 			'idPedido' => $res[$i]['idPedido'],
 			'idProduto' => $res[$i]['idProduto'],
			'qtProduto' => $res[$i]['qtProduto'],
            'data_inicial' => $res[$i]['data_inicial'],
            'data_final' => $res[$i]['data_final'],
            'idUsuarioComprador' => $res[$i]['idUsuarioComprador'],
            'idFornecedor' => $res[$i]['idFornecedor'],
            'horario_entrega_1' => formatHora($res[$i]['horario_entrega_1']),
            'horario_entrega_2' =>formatHora( $res[$i]['horario_entrega_2']),
            'endereco' => $res[$i]['endereco'],
            'cidade' => $res[$i]['cidade'],
            'estado' => $res[$i]['estado'],
            'cep' => $res[$i]['cep'],
            'categoria' => $res[$i]['categoria'],
            'nomeProduto' => $res[$i]['nomeProduto'],
            'valor' => $res[$i]['valor'],
            'urlImagem' => $res[$i]['urlImagem'],
            'unidadeMedida' => $res[$i]['unidadeMedida'],
            'qtMinimaPedido' => $res[$i]['qtMinimaPedido'],
            'nome_usuario_comprador' => $res[$i]['nome_usuario_comprador'],
            'usuario_vendedor' => $res[$i]['usuario_vendedor'],
            'qtEstoque ' => $res[$i]['qtEstoque'],


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
    


    $query = $pdo->prepare("UPDATE pedidos SET idProduto = :idProduto, qtProduto = :qtProduto, data_inicial = :data_inicial, data_final = :data_final, idUsuarioComprador = :idUsuarioComprador, idFornecedor = :idFornecedor, horario_entrega_1 = :horario_entrega_1, horario_entrega_2 = :horario_entrega_2,endereco = :endereco, cidade =:cidade, estado = :estado, cep = :cep  where id = :id");
  
            $query->bindValue(":idPedido", $postjson['idPedido']);
            $query->bindValue(":idProduto", $postjson['idProduto']);
            $query->bindValue(":qtProduto", $postjson['qtProduto']);
            $query->bindValue(":data_inicial", $postjson['data_inicial']);
            $query->bindValue(":data_final", $postjson['data_final']);
            $query->bindValue(":idUsuarioComprador", $postjson['idUsuarioComprador']);
            $query->bindValue(":idFornecedor", $postjson['idFornecedor']);
            $query->bindValue(":horario_entrega_1", $postjson['horario_entrega_1']);
            $query->bindValue(":horario_entrega_2", $postjson['horario_entrega_2']);
            $query->bindValue(":endereco", $postjson['endereco']);
            $query->bindValue(":cidade", $postjson['cidade']);
            $query->bindValue(":estado", $postjson['estado']);
            $query->bindValue(":cep", $postjson['cep']);
            $query->execute();
  
       $id = $pdo->lastInsertId();
       
  
      if($query){
        $result = json_encode(array('success'=>true, 'idPedido'=>$id));
  
        }else{
        $result = json_encode(array('success'=>false));
    
        }
     echo $result;

    }




    elseif($postjson['requisicao'] == 'excluir'){
    
            
        $query = $pdo->query("DELETE FROM pedidos where idPedido = '$postjson[idPedido]'");
      
                 
      
          if($query){
            $result = json_encode(array('success'=>true));
      
            }else{
            $result = json_encode(array('success'=>false));
        
            }
         echo $result;
    
  }
  
  else if($postjson['requisicao'] == 'contarPedidos'){


               $idUsuario= $postjson['idUsuario'];
               $nivelUsuario = $postjson['nivelUsuario'];

               if($nivelUsuario =='Cliente'){

                    $query = $pdo->query("SELECT count(idpedido) as qtPedido from pedidos where idusuarioComprador =$idUsuario");
               }else{

                    $query = $pdo->query("SELECT count(idpedido) as qtPedido from pedidos where idFornecedor =$idUsuario"); 
                }

              $res = $query->fetchAll(PDO::FETCH_ASSOC);

              for ($i=0; $i < count($res); $i++) { 
                foreach ($res[$i] as $key => $value) {
                }
                $dados[] = array(
                  'qtPedido' => $res[$i]['qtPedido'],
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