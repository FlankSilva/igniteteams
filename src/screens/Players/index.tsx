import { useState, useEffect, useRef } from 'react'
import { Alert, FlatList, TextInput, Keyboard } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'

import { Box } from '@components/Box'
import { ButtonIcon } from '@components/ButtonIcon'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { AppError } from '@utils/AppError'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { Form, HeaderList, NumbersOfPlayrs } from './styles'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/GroupRemoveByName'
import { Loading } from '@components/Loading'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInpuRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar',
      )
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInpuRef.current?.blur()
      Keyboard.dismiss()

      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possvel adicionar')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const playersByTeam = await playerGetByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Pessoa',
        'Não foi possivel carregar as pessoas do time selecionado.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover pessoa', 'Não foi possivel remover essa pessoa.')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)

      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover grupo', 'Não foi possivel remover o grupo')
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => groupRemove() },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Box>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInpuRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayrs>{players.length}</NumbersOfPlayrs>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Box>
  )
}
