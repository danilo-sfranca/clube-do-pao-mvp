
> clube-do-pao@0.1.0 test
> npm run test --workspace backend && npm run test --workspace frontend


> clube-do-pao-backend@0.1.0 test
> node --test

✔ GET /api/health returns service status (56.4947ms)
✔ POST /api/clientes registers a customer when data is valid (72.0183ms)
✔ GET /api/pcp/demanda returns the active customer count and total production (46.0181ms)
ℹ tests 3
ℹ suites 0
ℹ pass 3
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 481.0449

> clube-do-pao-frontend@0.1.0 test
> vitest --run


 RUN  v3.2.7 C:/Danilo/MBA/Engenharia de Software - AI Assisted Development/clube-do-pao/ai/frontend

 ✓ src/App.test.jsx (2 tests) 152ms
   ✓ App > renders the home page with core calls to action 75ms
   ✓ App > submits the customer form and shows a success message 76ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  20:42:31
   Duration  1.87s (transform 85ms, setup 154ms, collect 336ms, tests 152ms, environment 696ms, prepare 170ms)

   
> clube-do-pao-frontend@0.1.0 test
> vitest --run --coverage


 RUN  v3.2.7 C:/Danilo/MBA/Engenharia de Software - AI Assisted Development/clube-do-pao/ai/frontend
      Coverage enabled with v8

 ✓ src/App.test.jsx (2 tests) 191ms
   ✓ App > renders the home page with core calls to action 106ms
   ✓ App > submits the customer form and shows a success message 83ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  21:01:49
   Duration  2.27s (transform 88ms, setup 184ms, collect 347ms, tests 191ms, environment 814ms, prepare 228ms)

 % Coverage report from v8
------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------|---------|----------|---------|---------|-------------------
All files   |   40.36 |    78.94 |   61.53 |   40.36 |                   
 src        |   56.29 |    78.94 |      80 |   56.29 |                   
  App.jsx   |   59.14 |    83.33 |   88.88 |   59.14 | 127,174-284       
  main.jsx  |       0 |        0 |       0 |       0 | 1-13              
 src/pages  |    15.2 |      100 |       0 |    15.2 |                   
  Sobre.jsx |    15.2 |      100 |       0 |    15.2 | 30-190            
------------|---------|----------|---------|---------|-------------------


> clube-do-pao@0.1.0 build
> npm run build --workspace frontend


> clube-do-pao-frontend@0.1.0 build
> vite build

vite v6.4.3 building for production...
✓ 1591 modules transformed.
dist/index.html                   0.50 kB │ gzip:  0.31 kB
dist/assets/index-B2Y9Pvkc.css   26.62 kB │ gzip:  6.37 kB
dist/assets/index-BU0A8OT3.js   216.98 kB │ gzip: 70.50 kB
✓ built in 1.90s

## Backend (Node.js)
**Data da medição:** Pós-refatoração (Injeção de Dependência SQLite)
- **Status dos Testes:** 3/3 testes passando (0 falhas)
- **Cobertura de Linhas:** 70.11%
- **Cobertura de Branches:** 65.31%
- **Cobertura de Funções:** 77.42%
- **Teste de Inicialização (Cold Start):** Servidor iniciou com sucesso, sem erros de "Database is locked".