Website for the slack app Slack Reserver

![image](https://github.com/user-attachments/assets/e615e1cf-6229-451a-b468-1d505ff9da17)

-- Pricing -- 

![image](https://github.com/user-attachments/assets/eac63c02-a181-484b-ab9c-cdd904b414bf)


## Requisitos Técnicos e Funcionais

### 1. Finalizar a Conteinerização
- **Requisitos Técnicos:**
  - Configurar um arquivo `Dockerfile` funcional para o projeto.
  - Configurar um arquivo `docker-compose.yml` para gerenciar múltiplos serviços, caso necessário (ex.: banco de dados, servidor web).
  - Garantir que as imagens geradas sejam otimizadas e seguras.
  - Definir variáveis de ambiente essenciais no arquivo de configuração (ex.: `.env`).
- **Requisitos Funcionais:**
  - O ambiente deve ser replicável localmente com um único comando (`docker-compose up`).
  - Fornecer suporte para diferentes ambientes (desenvolvimento, teste e produção).

### 2. Construir Pipeline de Auto Deploy
- **Requisitos Técnicos:**
  - Configurar um pipeline no GitHub Actions ou outra ferramenta de CI/CD (ex.: Jenkins, GitLab CI).
  - Incluir etapas no pipeline para:
    - Testes automatizados (unitários e integrados).
    - Build do projeto.
    - Deploy automático em um servidor ou serviço (ex.: AWS, Vercel, Heroku, etc.).
  - Configurar chaves de acesso e permissões necessárias para o deploy.
- **Requisitos Funcionais:**
  - Garantir que o deploy seja acionado automaticamente ao realizar um merge na branch principal (`main` ou `master`).
  - Notificar o time via Slack ou outro canal após a conclusão do deploy.
  - Permitir rollback em caso de falhas.

### 3. Criar Página de Roadmap
- **Requisitos Técnicos:**
  - Desenvolver uma página web dedicada para exibir o roadmap do projeto.
  - Utilizar ferramentas visuais (ex.: gráficos ou linhas do tempo) para apresentar os objetivos.
  - Integrar a página ao site principal do projeto.
- **Requisitos Funcionais:**
  - Exibir as seguintes seções no roadmap:
    - Funcionalidades em andamento.
    - Funcionalidades planejadas.
    - Funcionalidades concluídas.
  - Permitir fácil atualização do conteúdo do roadmap (ex.: via arquivo de configuração ou CMS).
  - Garantir que a página seja responsiva e acessível.
