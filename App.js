import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const num = (t) => (t.trim() === '' ? NaN : Number(t.replace(',', '.')));
const brl = (v) => 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function App() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [desc, setDesc] = useState('');
  const [res, setRes] = useState(null);
  const [erro, setErro] = useState('');

  const aplicar = () => {
    setRes(null);
    const p = num(preco);
    const d = num(desc);
    if (nome.trim() === '') return setErro('Informe o nome do produto.');
    if (isNaN(p) || p < 0) return setErro('O preço deve ser um número não negativo.');
    if (isNaN(d) || d < 0 || d > 100) return setErro('O desconto deve estar entre 0% e 100%.');
    setErro('');
    const economia = (p * d) / 100;
    setRes({ economia, final: p - economia });
  };

  return (
    <View style={s.c}>
      <Text style={s.t}>🏷️ Calculadora de desconto</Text>
      <TextInput style={s.i} placeholder="Nome do produto" value={nome} onChangeText={setNome} />
      <TextInput style={s.i} placeholder="Preço original (R$)" keyboardType="numeric" value={preco} onChangeText={setPreco} />
      <TextInput style={s.i} placeholder="Desconto (%)" keyboardType="numeric" value={desc} onChangeText={setDesc} />
      <Pressable style={s.b} onPress={aplicar}><Text style={s.bt}>Aplicar desconto</Text></Pressable>
      {erro !== '' && <Text style={s.e}>{erro}</Text>}
      {res && (
        <View>
          <Text style={s.r}>Produto: {nome}</Text>
          <Text style={s.r}>Economia: {brl(res.economia)}</Text>
          <Text style={[s.r, { color: '#1e8449' }]}>Preço final: {brl(res.final)}</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#f4f6fb' },
  t: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1f2a44' },
  i: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccd', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  b: { backgroundColor: '#3b6cf6', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  bt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  r: { fontSize: 18, marginTop: 10, color: '#1f2a44', fontWeight: '600' },
  e: { color: '#c0392b', marginTop: 8 },
});