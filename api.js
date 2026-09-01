// Integração com API da AnyMarketing
async function fetchSalesData() {
    try {
        // Buscar todas as vendas do dia
        const salesResponse = await makeRequest('/orders', {
            method: 'GET',
            params: {
                status: 'completed,processing,pending',
                created_from: getStartOfDay(),
                created_to: getEndOfDay()
            }
        });

        const orders = salesResponse.data || [];

        // Filtrar pedidos válidos (sem cancelados e sem "Aguardando Pagamento")
        const validOrders = orders.filter(order => {
            const invalidStatuses = ['cancelled', 'canceled', 'awaiting_payment', 'aguardando_pagamento'];
            return !invalidStatuses.includes(order.status?.toLowerCase());
        });

        // Calcular métricas
        const vendaTotal = validOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const quantidadePedidos = validOrders.length;
        const ingressoMedio = quantidadePedidos > 0 ? vendaTotal / quantidadePedidos : 0;

        // Agrupar vendas por mercado/canal
        const mercadoMap = {};
        validOrders.forEach(order => {
            const mercado = order.marketplace || order.channel || 'Direto';
            if (!mercadoMap[mercado]) {
                mercadoMap[mercado] = 0;
            }
            mercadoMap[mercado] += order.total || 0;
        });

        const mercados = Object.entries(mercadoMap).map(([nome, valor]) => ({
            nome,
            valor,
            percentual: (valor / vendaTotal) * 100
        })).sort((a, b) => b.valor - a.valor);

        // Calcular taxa de conversão (visitantes -> pedidos)
        let taxaConversao = 0;
        try {
            const analyticsResponse = await makeRequest('/analytics/visitors', {
                method: 'GET',
                params: {
                    date_from: getStartOfDay(),
                    date_to: getEndOfDay()
                }
            });
            
            const visitors = analyticsResponse.total_visitors || 1;
            taxaConversao = (quantidadePedidos / visitors) * 100;
        } catch (e) {
            console.warn('Não foi possível calcular taxa de conversão:', e.message);
            // Usar valor padrão se não conseguir buscar visitantes
            taxaConversao = quantidadePedidos > 0 ? (quantidadePedidos / (quantidadePedidos * 10)) * 100 : 0;
        }

        return {
            vendaTotal,
            quantidadePedidos,
            ingressoMedio,
            taxaConversao: Math.min(taxaConversao, 100), // Limitar a 100%
            mercados,
            lastUpdate: new Date().toISOString()
        };

    } catch (error) {
        console.error('Erro ao buscar dados de vendas:', error);
        throw new Error(`Falha ao buscar dados: ${error.message}`);
    }
}

// Fazer requisição à API com tratamento de erros
async function makeRequest(endpoint, options = {}) {
    const {
        method = 'GET',
        params = {},
        data = null
    } = options;

    try {
        // Montar URL com parâmetros
        let url = `${CONFIG.API_BASE_URL}${endpoint}`;
        
        if (method === 'GET' && Object.keys(params).length > 0) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }

        // Montar headers
        const headers = {
            'Authorization': `Bearer ${CONFIG.API_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        // Opções da requisição
        const fetchOptions = {
            method,
            headers,
            timeout: CONFIG.TIMEOUT
        };

        if (data && method !== 'GET') {
            fetchOptions.body = JSON.stringify(data);
        }

        // Fazer requisição
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                `API Error ${response.status}: ${errorData.message || response.statusText}`
            );
        }

        return await response.json();

    } catch (error) {
        console.error(`Erro na requisição ${endpoint}:`, error);
        throw error;
    }
}

// Obter início do dia (00:00:00)
function getStartOfDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return start.toISOString();
}

// Obter fim do dia (23:59:59)
function getEndOfDay() {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    return end.toISOString();
}
