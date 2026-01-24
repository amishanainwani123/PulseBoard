
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, StatusBar } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      router.replace('/tabs/home');
    } else {
      console.log('Please fill in all fields');
    }
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View className="h-[30vh] bg-black justify-center items-center border-b-2 border-cyber-green/30">
        <SafeAreaView className="absolute top-5 left-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-cyber-green text-base font-bold">
              ← BACK
            </Text>
          </TouchableOpacity>
        </SafeAreaView>

        <View className="items-center">
          <Text className="text-cyber-green text-[34px] font-black tracking-wide">
            LOGIN
          </Text>
          <Text className="text-cyber-cyan text-sm mt-2 tracking-widest">
            ACCESS YOUR ACCOUNT
          </Text>
        </View>
      </View>

      {/* Form */}
      <View className="flex-1 px-8 pt-10">
        {/* Email */}
        <View className="mb-6">
          <Text className="text-[12px] text-cyber-cyan mb-2 font-bold tracking-widest">
            EMAIL ADDRESS
          </Text>
          <TextInput
            className="h-[54px] bg-cyber-green/5 border border-cyber-green/30 rounded-xl px-5 text-base text-white"
            placeholder="example@mail.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View className="mb-8">
          <Text className="text-[12px] text-cyber-cyan mb-2 font-bold tracking-widest">
            PASSWORD
          </Text>
          <TextInput
            className="h-[54px] bg-cyber-green/5 border border-cyber-green/30 rounded-xl px-5 text-base text-white"
            placeholder="••••••••"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          className="bg-cyber-green h-14 rounded-full justify-center items-center mt-2"
          onPress={handleLogin}
        >
          <Text className="text-black text-base font-black tracking-widest">
            LOGIN
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text className="text-center mt-6 text-neutral-300 text-sm">
            Don't have an account?{' '}
            <Text className="text-cyber-green font-bold">REGISTER</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}