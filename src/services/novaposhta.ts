const NP_API_URL = 'https://api.novaposhta.ua/v2.0/json/'
const API_KEY = import.meta.env.VITE_NP_API_KEY

export interface INPCity {
  Ref: string
  Present: string
}

export interface INPWarehouse {
  Ref: string
  Description: string
}

const npPost = (modelName: string, calledMethod: string, methodProperties: object) =>
  fetch(NP_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: API_KEY, modelName, calledMethod, methodProperties }),
  }).then(r => r.json())

export const searchNPCities = async (query: string): Promise<INPCity[]> => {
  const res = await npPost('Address', 'searchSettlements', {
    CityName: query,
    Limit: '10',
    Page: '1',
  })
  return res.data?.[0]?.Addresses ?? []
}

export const getNPWarehouses = async (cityRef: string): Promise<INPWarehouse[]> => {
  const res = await npPost('Address', 'getWarehouses', {
    SettlementRef: cityRef,
    Limit: '50',
    Page: '1',
    Language: 'UA',
  })
  return res.data ?? []
}
