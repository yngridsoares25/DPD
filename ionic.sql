-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29-Out-2020 às 16:20
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
  `cep` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `idProduto`, `qtProduto`, `data_inicial`, `data_final`, `idUsuarioComprador`, `idFornecedor`, `horario_entrega_1`, `horario_entrega_2`, `endereco`, `cidade`, `estado`, `cep`) VALUES
(9, 13, 30, '2020-10-27 00:00:00', '2020-10-27 00:00:00', 10, 9, '15:35:49', '15:35:49', 'Es 4B Rua 5', 'Brasília', 'DF', 73083),
(10, 17, 200, '2020-10-24 00:00:00', '2020-12-31 00:00:00', 10, 9, '08:00:53', '18:00:53', 'Es 4B Rua 5', 'Brasília', 'DF', 73060000);

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
(13, 'Cheiro Verde', 'Verduras', '2.00', 9, '', 'Unidade', 500, 3000),
(14, 'Alface Americana', 'Verduras', '0.65', 11, '', 'Unidade', 1000, 8000),
(15, 'Alface Lisa', 'Verduras', '0.70', 11, '', 'Unidade', 1000, 8000),
(16, 'Alface Crespa', 'Verduras', '0.75', 11, '', 'Unidade', 1000, 8000),
(17, 'Couve Verde', 'Verduras', '2.00', 9, '', 'Unidade', 100, 8000);

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
(12, 'Samuel do Tomate', 'produtor3@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor');

--
-- Índices para tabelas despejadas
--

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
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `idProduto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
