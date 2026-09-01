# Dashboard de Vendas - AnyMarketing 🎯

Um dashboard em tempo real para monitorar suas vendas da AnyMarketing em uma TV ou monitor.

## ✨ Funcionalidades

- 📊 **Venda Total** - Receita total do dia
- 📦 **Quantidade de Pedidos** - Contagem de pedidos (sem cancelados ou "Aguardando Pagamento")
- 💳 **Ingresso Médio** - Ticket médio por pedido
- 📈 **Taxa de Conversão** - Percentual de conversão
- 🏪 **Venda por Mercado** - Breakdown por marketplace/canal
- 🔄 **Atualização Automática** - A cada 5 minutos
- 📱 **Responsivo** - Otimizado para TV e qualquer dispositivo

## 🚀 Como Usar

### 1. Acesso Rápido
Simplesmente abra no navegador:
```
https://giovanamoraesesplanada.github.io/dashboard-vendas-anymarketing/
```

### 2. Configurar Token da API
O arquivo `config.js` já contém seu token da AnyMarketing. Se precisar atualizá-lo:

1. Abra `config.js`
2. Atualize o campo `API_TOKEN`:
```javascript
API_TOKEN: 'seu-token-aqui'
```

### 3. Deploy em Produção
O dashboard está automaticamente publicado via GitHub Pages!

## 📱 Acesso em TV

1. Acesse no navegador: `https://giovanamoraesesplanada.github.io/dashboard-vendas-anymarketing/`
2. Deixe a tela atualizando a cada 5 minutos
3. A página atualiza automaticamente durante o dia

## 📊 Métricas Exibidas

### Venda Total
- Suma de todas as vendas válidas do dia
- Exclui canceladas e "Aguardando Pagamento"

### Quantidade de Pedidos
- Total de pedidos processados
- Filtra automaticamente pedidos inválidos

### Ingresso Médio
- Venda Total ÷ Quantidade de Pedidos
- Mostra o ticket médio

### Taxa de Conversão
- Baseada em visitantes vs pedidos
- Percentual de visitantes que compraram

### Venda por Mercado
- Distribuição por marketplace/canal
- Mostra percentual de cada canal

## 🔧 Tecnologia

- HTML5 + CSS3 + Vanilla JavaScript
- Fetch API para requisições
- Sem dependências externas
- Totalmente responsivo

## ⚙️ Configurações

Arquivo `config.js`:
```javascript
const CONFIG = {
    API_TOKEN: 'seu-token', // Token da AnyMarketing
    API_BASE_URL: 'https://api.anymarketing.com.br/v1', // URL base da API
    TIMEOUT: 30000, // Timeout em ms
    UPDATE_INTERVAL: 5 // Intervalo de atualização em minutos
};
```

## 📝 Notas Importantes

- ✅ Sem cancelados
- ✅ Sem "Aguardando Pagamento"
- ✅ Dados em tempo real
- ✅ Atualização a cada 5 minutos
- ✅ Acesso público via link
- ✅ Otimizado para TV (fonts grandes, cores vibrantes)

## 🐛 Troubleshooting

### Dashboard em branco?
- Verifique a console (F12) para ver erros
- Confirme que o token está correto em `config.js`
- Verifique conexão de internet

### Dados não aparecem?
- Aguarde 5 minutos para primeira atualização
- Verifique se há vendas no AnyMarketing hoje
- Confirme permissões do token

### Atualizações lentas?
- Verifique velocidade da internet
- Tente atualizar a página (F5)
- Verificar status da API AnyMarketing

## 📞 Suporte

Se encontrar problemas, verifique:
1. Token da API está válido
2. Acesso à internet está funcionando
3. Console do navegador para mensagens de erro
4. Status da API AnyMarketing

---

**Dashboard atualizado em:** Setembro 2026
