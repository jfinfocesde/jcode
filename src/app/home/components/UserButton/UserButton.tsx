import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { useRouter } from 'next/navigation'

interface Props {
  name: string | undefined
  email: string | undefined
  avatar: string | undefined
}

export function UserButton({ name, email, avatar }: Props) {

  const router = useRouter()

  return (
    <UnstyledButton className={classes.user}
      onClick={() => {
        router.push('/home/pages/profile')
      }}
    >
      <Group>
        <Avatar
          src={avatar}
          radius="xl"
        />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500} style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {name}
          </Text>
          <Text c="dimmed" size="xs" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {email}
          </Text>
        </div>
        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
