CREATE DATABASE ECOVERDECONNECT;

USE ECOVERDECONNECT;

CREATE TABLE NEWS (
	id bigint unsigned auto_increment primary key,
    title varchar(255) not null,
    content longtext not null,
    links longtext not null
);

CREATE TABLE USERS (
	id bigint unsigned auto_increment primary key,
    username varchar(255) not null unique,
    password varchar(255) not null
);

insert into news(title, content,links)
values('Brasil é pioneiro na criação de currículo escolar sobre cultura oceânica',
'A Educação Oceânica no Programa de Estudos Brasileiros Com o suporte da Unesco, o Brasil é o primeiro país a oficializar a incorporação da educação sobre os oceanos no currículo escolar do país. A ação, oficializada com a assinatura de um documento em Brasília, tem como objetivo educar cidadãos sobre a relevância dos oceanos e faz parte dos preparativos para a COP30 em Belém. O "currículo azul", que se adapta às realidades locais, está alinhado com a Década do Oceano da ONU e é resultado da cooperação entre ministérios, instituições de ensino superior e redes de ensino. A ação posiciona o Brasil na linha de frente da educação oceânica mundial, convertendo o saber científico em política pública.',
'https://jornaldomeioambientesp.org/noticia/Brasil-%C3%A9-pioneiro-na-cria%C3%A7%C3%A3o-de-curr%C3%ADculo-escolar-sobre-cultura-oce%C3%A2nica/2402'),

('Operação Xapiri em Rondônia combate crime de extração ilegal de madeira',
'Ibama Luta Contra Desmatamento Ilegal em Território Indígena Durante a Operação Xapiri Rondônia, o Ibama, em colaboração com a Polícia Federal e a Funai, desmantelou um esquema de extração ilegal de madeira na Terra Indígena Igarapé Lage (RO). O equipamento empregado, que incluía um trator skidder, foi descartado, resultando em um prejuízo estimado de R$ 200 mil. A intervenção em Nova Mamoré evidencia o aumento da pressão sobre o território indígena, delimitado e habitado por aproximadamente mil indígenas, que enfrenta invasões e loteamentos irregulares. A ação faz parte da estratégia nacional de defesa das Terras Indígenas, com o objetivo de assegurar os direitos dos indígenas e lutar contra o desmatamento, com a expectativa de identificar e penalizar os culpados.',
'https://jornaldomeioambientesp.org/noticia/Opera%C3%A7%C3%A3o-Xapiri-em-Rond%C3%B4nia-combate-crime-de-extra%C3%A7%C3%A3o-ilegal-de-madeira/2399'),

('Setor da construção baixa emissões de CO2 pela primeira vez, diz Pnuma',
'Um documento conjunto do Pnuma e da GlobalABC (Relatório de Status Global 2024-2025) mostra uma diminuição inédita nas emissões de CO2 no setor da construção em 2023, impulsionada pela diminuição do consumo energético e maior utilização de energias renováveis. Embora tenha havido progresso, o setor continua sendo um dos principais contribuintes para a crise climática. O documento solicita maior empenho em seis setores vitais, como a implementação de códigos de construção com zero carbono por grandes emissores até 2028 e em escala global até 2035, além da incorporação de planos de reforma nas NDCs. A ONU destaca a necessidade premente de atualizar os códigos de energia e ampliar o financiamento para atingir os objetivos climáticos, uma vez que as construções representam um terço das emissões e resíduos globais.',
'https://jornaldomeioambientesp.org/noticia/Setor-da-constru%C3%A7%C3%A3o-baixa-emiss%C3%B5es-de-CO2-pela-primeira-vez--diz-Pnuma/2393'),

('Conferência debate impactos perigosos da poluição do ar na saúde e na economia BR',
'A Fundação Príncipe Albert II de Mônaco iniciou formalmente suas operações no Brasil em 2024, com foco na proteção da biodiversidade e do meio ambiente. A instituição financiará programas de prevenção de incêndios florestais em territórios indígenas, proteção da biodiversidade na região do Alto Juruá, na Floresta Amazônica, e concederá bolsas de doutorado na USP em áreas relacionadas à sustentabilidade. O príncipe Charles-Philippe de Orléans, vice-presidente-executivo da filial da América Latina, visitou São Paulo para promover os projetos e destacou o potencial do Brasil em liderar a preservação ambiental global.',
'https://jornaldomeioambientesp.org/noticia/Confer%C3%AAncia-debate-impactos-perigosos-da-polui%C3%A7%C3%A3o-do-ar-na-sa%C3%BAde-e-na-economia-BR/2394');

select * from news;
