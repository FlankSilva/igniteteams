import { useState } from 'react'
import { FlatList } from 'react-native'

import { Box } from '@components/Box'
import { ButtonIcon } from '@components/ButtonIcon'
import { Header } from '@components/Header'

import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Form, HeaderList, NumbersOfPlayrs } from './styles'
import { Filter } from '@components/Filter'

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState([])

  return (
    <Box>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
    </Box>
  )
}
