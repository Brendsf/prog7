import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function App() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=bde8cf1d&city_name=Paulista,PE')
      .then(resposta => resposta.json())
      .then(dados => {
        setClima(dados.results);
      })
      .catch(erro => {
        console.error("Erro ao buscar clima:", erro);
      });
  }, []);

  return (
    <View style={styles.tela}>
      {clima && (
        <>
          <Text style={styles.cidade}>{clima.city}</Text>
          <Image
            style={styles.imagem}
            source={{ uri: `https://assets.hgbrasil.com/weather/icons/conditions/fog.svg` }}
          />
          <Text style={styles.temperatura}>{clima.temp}º</Text>
          <Text style={styles.descri}>Precipitação</Text>
          <Text style={styles.descri}>
            Máx: {clima.forecast[0].max}º  Mín: {clima.forecast[0].min}º
          </Text>

          <View style={styles.infoClima}>
            <Text style={styles.infos}>💧 {clima.cloudiness}%</Text>
            <Text style={styles.infos}>💦 {clima.humidity}%</Text>
            <Text style={styles.infos}>💨 {clima.wind_speedy}</Text>
          </View>

          <View style={styles.previsaoHoje}>
            <Text style={styles.titulo}>Hoje</Text>
            <View style={styles.linha}>
              <Text style={styles.horaClima}>15h - {clima.temp}º ☁️</Text>
              <Text style={styles.horaClima}>16h - {clima.temp}º ☁️</Text>
              <Text style={styles.horaClima}>17h - {clima.temp}º ☁️</Text>
            </View>
          </View>

          <View style={styles.previsaoSemana}>
            <Text style={styles.titulo}>Previsão da Semana:</Text>
            {clima.forecast.slice(1, 6).map((dia, index) => (
              <Text key={index} style={styles.dia}>
                {dia.weekday} — {dia.max}º
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#bde0fe',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cidade: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  imagem: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  temperatura: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descri: {
    fontSize: 16,
    marginBottom: 3,
  },
  infoClima: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 15,
  },
  infos: {
    fontSize: 16,
  },
  previsaoHoje: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  linha: {
    marginTop: 10,
  },
  horaClima: {
    fontSize: 16,
    marginBottom: 5,
  },
  previsaoSemana: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dia: {
    fontSize: 16,
    marginBottom: 4,
  },
});
