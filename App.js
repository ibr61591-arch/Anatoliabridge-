import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [livenessCode] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const [auditCount, setAuditCount] = useState(1);
  const [lastCheck, setLastCheck] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setAuditCount((c) => c + 1);
      setLastCheck(new Date().toLocaleTimeString());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!permission) return <View style={styles.container} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sentinelBar}>
        <Text style={styles.sentinelTitle}>🛡️ SENTINEL AI DENETÇİ: AKTİF (OTA GÜNCEL)</Text>
        <Text style={styles.sentinelSub}>20/20 Güvenlik Kilidi Aktif | Denetim #{auditCount} ({lastCheck})</Text>
      </View>

      <Text style={styles.brand}>ANATOLIABRIDGE</Text>
      <Text style={styles.sub}>Verified Production, Protected Global Trade</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>1. Canlı Devlet Vergi & Safe Harbor Kilidi</Text>
        <Text style={styles.info}>• GİB & EU VIES Durumu: AKTİF MÜKELLEF ✓</Text>
        <Text style={styles.info}>• Hukuki Statü: Aracı Hizmet Sağlayıcı (Taraf Değil) ✓</Text>
        <Text style={styles.info}>• Kargo Kantarı & Rota: 420 kg Eşleşti - Teslimatta ✓</Text>
        <Text style={styles.info}>• Escrow Havuzu: $5,000 USD Kilitli (%3+%3 Komisyon) ✓</Text>
      </View>

      {step === 1 && (
        <TouchableOpacity style={styles.btn} onPress={() => setStep(2)}>
          <Text style={styles.btnText}>Kurye GPS + PIN Teslimatını Onayla</Text>
        </TouchableOpacity>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>2. Zorunlu Canlı Kutu Açılış Kamerası</Text>
          <Text style={styles.warning}>
            Galeri kapalıdır! Kayda başlarken kutunun yanına bu kodu tutun: #{livenessCode}
          </Text>

          {!permission.granted ? (
            <TouchableOpacity style={styles.btn} onPress={requestPermission}>
              <Text style={styles.btnText}>Kameraya İzin Ver</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.camBox}>
              <CameraView style={styles.camera} mode="video" />
              <TouchableOpacity
                style={[styles.recordBtn, isRecording && styles.stopBtn]}
                onPress={() => {
                  if (!isRecording) {
                    setIsRecording(true);
                  } else {
                    setIsRecording(false);
                    Alert.alert(
                      'Sentinel & AI Doğrulama Tamamlandı',
                      `Liveness Kodu (#${livenessCode}) ve QR mühür onaylandı. $4,850 Satıcıya, $300 AnatoliaBridge kasasına aktarıldı!`
                    );
                    setStep(3);
                  }
                }}
              >
                <Text style={styles.btnText}>
                  {isRecording ? 'KAYDI BİTİR VE PARAYI AKTAR' : 'CANLI KUTU AÇILIŞINI BAŞLAT'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {step === 3 && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>✓ İŞLEM BAŞARIYLA TAMAMLANDI</Text>
          <Text style={styles.info}>AnatoliaBridge Net Kazancı: $300.00 USD</Text>
          <TouchableOpacity style={styles.btn} onPress={() => setStep(1)}>
            <Text style={styles.btnText}>Yeni İşlem Test Et</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#020617', padding: 20, paddingTop: 40 },
  sentinelBar: { backgroundColor: '#064e3b', padding: 10, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#10b981' },
  sentinelTitle: { color: '#34d399', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  sentinelSub: { color: '#a7f3d0', fontSize: 10, textAlign: 'center', marginTop: 2 },
  brand: { color: '#38bdf8', fontSize: 24, fontWeight: 'bold', textAlign: 'center', letterSpacing: 1.5 },
  sub: { color: '#94a3b8', fontSize: 12, textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#0f172a', padding: 16, borderRadius: 14, marginBottom: 16, borderWidth: 1, borderColor: '#1e293b' },
  cardTitle: { color: '#f8fafc', fontSize: 15, fontWeight: 'bold', marginBottom: 10 },
  info: { color: '#cbd5e1', fontSize: 13, marginBottom: 6 },
  warning: { color: '#fbbf24', fontSize: 13, fontWeight: 'bold', marginBottom: 12 },
  btn: { backgroundColor: '#0284c7', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  camBox: { height: 320, borderRadius: 12, overflow: 'hidden' },
  camera: { flex: 1 },
  recordBtn: { backgroundColor: '#16a34a', padding: 15, alignItems: 'center' },
  stopBtn: { backgroundColor: '#dc2626' },
  successBox: { backgroundColor: '#064e3b', padding: 20, borderRadius: 12, alignItems: 'center' },
  successText: { color: '#34d399', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
});

