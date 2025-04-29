CREATE DATABASE ECOVERDECONNECT;

USE ECOVERDECONNECT;

CREATE TABLE NEWS (
	id bigint unsigned auto_increment primary key,
    title varchar(255) not null,
    content longtext not null
);

CREATE TABLE USERS (
	id bigint unsigned auto_increment primary key,
    username varchar(255) not null unique,
    password varchar(255) not null
);

insert into news(title, content)
values('Brasil apresenta plano climático ambicioso para reduzir emissões até 2035',
'Durante a COP29, o Brasil anunciou seu novo plano climático, comprometendo-se a reduzir entre 59% e 67% das emissões de gases de efeito estufa até 2035, em comparação aos níveis de 2005. O país também apresentou o "Pacto para a Transformação Ecológica", que visa reestruturar a economia nacional com foco em sustentabilidade. Apesar dos avanços, especialistas apontam que os compromissos podem ser insuficientes para limitar o aquecimento global a 1,5°C, especialmente considerando os planos do Brasil de aumentar a produção de combustíveis fósseis.'),

('Pará estabelece meta de recuperar 140 mil hectares com produção sustentável até 2025',
'O governo do Pará anunciou, durante a COP28, a meta de recuperar 140 mil hectares de áreas degradadas para produção sustentável até 2025, beneficiando cerca de 4 mil famílias. A iniciativa faz parte da estratégia de agricultura regenerativa do estado, que busca conciliar a preservação da floresta com a produção alimentar. O projeto prevê investimentos de aproximadamente US$ 500 milhões e inclui a implementação da Plataforma Territórios Sustentáveis para regularização ambiental e fundiária.'),

('Governo Federal lança política inédita para estimular sustentabilidade em portos, aeroportos e hidrovias','Em janeiro de 2025, o Ministério de Portos e Aeroportos lançou uma política pioneira de sustentabilidade voltada para portos, aeroportos e hidrovias. A iniciativa visa incentivar práticas sustentáveis, promover a transparência e fortalecer a inclusão social no setor. Empresas que adotarem práticas ambientais, sociais e de governança receberão um selo de reconhecimento, estimulando a adoção de medidas sustentáveis em suas operações.'),

('Fundação Príncipe Albert II de Mônaco inicia operações no Brasil para proteção da biodiversidade', 'A Fundação Príncipe Albert II de Mônaco iniciou formalmente suas operações no Brasil em 2024, com foco na proteção da biodiversidade e do meio ambiente. A instituição financiará programas de prevenção de incêndios florestais em territórios indígenas, proteção da biodiversidade na região do Alto Juruá, na Floresta Amazônica, e concederá bolsas de doutorado na USP em áreas relacionadas à sustentabilidade. O príncipe Charles-Philippe de Orléans, vice-presidente-executivo da filial da América Latina, visitou São Paulo para promover os projetos e destacou o potencial do Brasil em liderar a preservação ambiental global.');
