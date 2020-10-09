-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09-Out-2020 às 15:14
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
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nomeProduto` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `valor` decimal(10,0) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `urlImagem` varchar(250) DEFAULT NULL,
  `unidadeMedida` varchar(50) NOT NULL,
  `qtMinimaPedido` int(11) NOT NULL,
  `qtEstoque` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nomeProduto`, `categoria`, `valor`, `idUsuario`, `urlImagem`, `unidadeMedida`, `qtMinimaPedido`, `qtEstoque`) VALUES
(7, 'Alface', 'Verduras', '3', 1, '', 'Unidade', 35, 1000),
(8, 'Cheiro Verde', 'Verduras', '3', 1, '', 'Unidade', 50, 350);

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
(1, 'Marcos Silva', 'marcoss@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Admin'),
(4, 'Paula Silva', 'paula@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Admin'),
(5, 'Amanda Campos', 'amanda@hotmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Medico'),
(7, 'Yngrid Soares ', 'yndy@gmail.com', '202cb962ac59075b964b07152d234b70', '123', 'Produtor');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
