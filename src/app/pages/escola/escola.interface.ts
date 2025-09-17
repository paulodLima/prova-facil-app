export interface StateOption {
  label: string;
  value: string;
}

export const STATE_OPTIONS: StateOption[] = [
  { label: 'Estado de Acre', value: 'AC' },
  { label: 'Estado de Alagoas', value: 'AL' },
  { label: 'Estado do Amapá', value: 'AP' },
  { label: 'Estado do Amazonas', value: 'AM' },
  { label: 'Estado da Bahia', value: 'BA' },
  { label: 'Estado do Ceará', value: 'CE' },
  { label: 'Estado do Distrito Federal', value: 'DF' },
  { label: 'Estado do Espírito Santo', value: 'ES' },
  { label: 'Estado de Goiás', value: 'GO' },
  { label: 'Estado do Maranhão', value: 'MA' },
  { label: 'Estado de Mato Grosso', value: 'MT' },
  { label: 'Estado de Mato Grosso do Sul', value: 'MS' },
  { label: 'Estado de Minas Gerais', value: 'MG' },
  { label: 'Estado do Pará', value: 'PA' },
  { label: 'Estado da Paraíba', value: 'PB' },
  { label: 'Estado do Paraná', value: 'PR' },
  { label: 'Estado de Pernambuco', value: 'PE' },
  { label: 'Estado do Piauí', value: 'PI' },
  { label: 'Estado do Rio de Janeiro', value: 'RJ' },
  { label: 'Estado do Rio Grande do Norte', value: 'RN' },
  { label: 'Estado do Rio Grande do Sul', value: 'RS' },
  { label: 'Estado de Rondônia', value: 'RO' },
  { label: 'Estado de Roraima', value: 'RR' },
  { label: 'Estado de Santa Catarina', value: 'SC' },
  { label: 'Estado de São Paulo', value: 'SP' },
  { label: 'Estado de Sergipe', value: 'SE' },
  { label: 'Estado do Tocantins', value: 'TO' }
];

export interface PostEscolaRequest {
  nome: string;
  email: string;
  estado: string;
}
