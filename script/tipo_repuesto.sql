INSERT INTO `tipo_repuesto` (`id`, `name`, `fecha_alta`, `fecha_baja`, `mla_id`) VALUES
(1, 'Aditivos y Lubricantes', '2020-05-22', NULL, 'MLA86011'),
(2, 'Baterías', '2020-05-22', NULL, 'MLA2220'),
(3, 'Carrocería', '2020-05-22', NULL, 'MLA373359'),
(4, 'Cerraduras y Llaves', '2020-05-22', NULL, 'MLA373344'),
(5, 'Climatización', '2020-05-22', NULL, 'MLA373048'),
(6, 'Componentes de Seguridad', '2020-05-22', NULL, 'MLA373357'),
(7, 'Cristales', '2020-05-22', NULL, 'MLA3169'),
(8, 'Electroventiladores', '2020-05-22', NULL, 'MLA85927'),
(9, 'Encendido', '2020-05-22', NULL, 'MLA22260'),
(10, 'Escapes', '2020-05-22', NULL, 'MLA22292'),
(11, 'Filtros', '2020-05-22', NULL, 'MLA4859'),
(12, 'Frenos', '2020-05-22', NULL, 'MLA22291'),
(13, 'Iluminación', '2020-05-22', NULL, 'MLA373142'),
(14, 'Instalaciones Eléctricas', '2020-05-22', NULL, 'MLA86841'),
(15, 'Inyección', '2020-05-22', NULL, 'MLA22245'),
(16, 'Motor', '2020-05-22', NULL, 'MLA3172'),
(17, 'Repuestos de Exterior', '2020-05-22', NULL, 'MLA373108'),
(18, 'Repuestos de Habitáculo', '2020-05-22', NULL, 'MLA373144'),
(19, 'Suspensión y Dirección', '2020-05-22', NULL, 'MLA22222'),
(20, 'Transmisión', '2020-05-22', NULL, 'MLA373442'),
(21, 'Otros', '2020-05-22', NULL, 'MLA85960');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tipo_repuesto`
--
ALTER TABLE `tipo_repuesto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tipo_repuesto`
--
ALTER TABLE `tipo_repuesto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
