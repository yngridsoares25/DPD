-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13-Nov-2020 às 17:39
-- Versão do servidor: 10.4.13-MariaDB
-- versão do PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ionic`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nomeCategoria` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `imagens_produto`
--

CREATE TABLE `imagens_produto` (
  `id` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `nome_imagem` varchar(200) NOT NULL,
  `foto_principal` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `imagens_produto`
--

INSERT INTO `imagens_produto` (`id`, `id_produto`, `nome_imagem`, `foto_principal`) VALUES
(1, 22, '1605207173325.jpeg', 0),
(2, 23, '1605224920361.jpeg', 0),
(3, 23, '1605224914348.jpeg', 0),
(4, 23, '1605224909515.jpeg', 0),
(5, 25, '1605230854924.jpeg', 1),
(6, 25, '1605230850329.jpeg', 0),
(7, 26, '1605232212986.jpeg', 1),
(8, 27, '1605232301629.jpeg', 1),
(9, 28, '1605232994077.jpeg', 1),
(11, 30, '1605233406522.jpeg', 1),
(12, 31, '1605234473923.jpeg', 1),
(13, 32, '1605234553330.jpeg', 1),
(14, 33, '1605236320571.jpeg', 1),
(15, 34, '1605236704733.jpeg', 1),
(16, 35, '1605271009101.jpeg', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `idProduto` int(11) NOT NULL,
  `qtProduto` int(11) NOT NULL,
  `data_inicial` datetime NOT NULL,
  `data_final` datetime NOT NULL,
  `idUsuarioComprador` int(11) NOT NULL,
  `idFornecedor` int(11) NOT NULL,
  `horario_entrega_1` time NOT NULL,
  `horario_entrega_2` time NOT NULL,
  `endereco` varchar(250) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `cep` int(11) NOT NULL,
  `status` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `idProduto`, `qtProduto`, `data_inicial`, `data_final`, `idUsuarioComprador`, `idFornecedor`, `horario_entrega_1`, `horario_entrega_2`, `endereco`, `cidade`, `estado`, `cep`, `status`) VALUES
(9, 13, 30, '2020-10-27 00:00:00', '2020-10-27 00:00:00', 10, 9, '15:35:49', '15:35:49', 'Es 4B Rua 5', 'Brasília', 'DF', 73083, NULL),
(10, 17, 200, '2020-10-24 00:00:00', '2020-12-31 00:00:00', 10, 9, '08:00:53', '18:00:53', 'Es 4B Rua 5', 'Brasília', 'DF', 73060000, NULL),
(11, 17, 1231231, '2020-11-04 00:00:00', '2020-11-04 00:00:00', 10, 9, '14:16:41', '14:16:41', 'Es 4B Rua 5', 'Brasília', '73083', 1231123, NULL),
(12, 17, 123123, '2020-11-05 00:00:00', '2020-11-05 00:00:00', 10, 9, '08:48:42', '08:48:42', 'Es 4B Rua 5', 'Brasília', '1231', 123123, NULL),
(13, 17, 123123, '2020-11-05 00:00:00', '2020-11-05 00:00:00', 10, 9, '08:48:42', '08:48:42', 'Es 4B Rua 5', 'Brasília', '1231', 123123, NULL),
(14, 17, 123123, '2020-11-05 00:00:00', '2020-11-05 00:00:00', 10, 9, '10:15:59', '10:15:59', 'Es 4B Rua 5', 'Brasília', '123123', 123123123, NULL),
(15, 17, 123123, '2020-11-05 00:00:00', '2020-11-05 00:00:00', 10, 9, '10:15:59', '10:15:59', 'Es 4B Rua 5', 'Brasília', '123123', 123123123, NULL),
(16, 17, 123123, '2020-11-05 00:00:00', '2020-11-05 00:00:00', 10, 9, '00:00:00', '00:00:00', 'Es 4B Rua 5', 'Brasília', '1231', 1231, NULL),
(17, 17, 213213, '2020-11-05 00:00:00', '2020-11-05 00:00:00', 10, 9, '10:32:00', '10:32:00', 'Es 4B Rua 5', 'Brasília', '12313', 123123, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `idProduto` int(11) NOT NULL,
  `nomeProduto` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `valor` decimal(12,2) NOT NULL,
  `idFornecedor` int(11) NOT NULL,
  `urlImagem` varchar(250) DEFAULT NULL,
  `unidadeMedida` varchar(50) NOT NULL,
  `qtMinimaPedido` int(11) NOT NULL,
  `qtEstoque` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`idProduto`, `nomeProduto`, `categoria`, `valor`, `idFornecedor`, `urlImagem`, `unidadeMedida`, `qtMinimaPedido`, `qtEstoque`) VALUES
(26, 'Alface', 'Verduras', '1.00', 9, '', 'Unidade', 100, 300),
(27, 'Cheiro Verde', 'Verduras', '3.00', 9, '', 'Unidade', 132, 1231),
(28, 'Couve', 'Verduras', '3.00', 9, '', 'Unidade', 23, 2342),
(29, 'Tomates', 'Legumes', '70.00', 9, '', 'g', 5, 80),
(35, 'ALFACE VARIAS IMAGENS', 'Verduras', '2.00', 9, '', 'Unidade', 123, 12313);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(35) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `senha` varchar(120) NOT NULL,
  `senha_original` varchar(20) NOT NULL,
  `nivel` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `usuario`, `senha`, `senha_original`, `nivel`) VALUES
(7, 'Yngrid Soares ', 'yndy@gmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor'),
(9, 'João das Coves', 'produtor@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor'),
(10, 'Mercearia BOM PREÇO', 'cliente@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Cliente'),
(11, 'Serjão do Alface', 'produtor2@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor'),
(12, 'Samuel do Tomate', 'produtor3@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor'),
(13, 'Manuel do xuxu', 'produtor10@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor'),
(14, 'Maria do Feijão', 'produtor11@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor'),
(15, 'Maria do ARROZ', 'produtor12@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor'),
(16, 'JOSÉ DAS ALFAFA', 'produtor34@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `imagens_produto`
--
ALTER TABLE `imagens_produto`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`);

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`idProduto`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `imagens_produto`
--
ALTER TABLE `imagens_produto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `idProduto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
