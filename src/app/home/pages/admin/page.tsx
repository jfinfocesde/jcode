'use client'

import { Database } from '@/types/supabase/supabase';
import { ActionIcon, Badge, Box, Button, Group, Modal, Paper, Switch, TextInput, Textarea, Text, CopyButton, Tooltip, rem, Stack, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { IconCheck, IconCopy, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { DataTable } from 'mantine-datatable';
import classes from './page.module.css';

interface GroupProps {
  block_registration: boolean | null;
  code: string | null;
  created_at: string;
  description: string | null;
  id: string;
  name: string | null;
}

export default function page() {

  const supabase = createClientComponentClient<Database>()

  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [openedDel, { open: openDel, close: closeDel }] = useDisclosure(false);

  const [idGroup, setIdGroup] = useState<string>("")
  const [groups, setGroups] = useState<GroupProps[]>()

  const openModalEdit = (group: GroupProps) => {
    setIdGroup(group.id)
    formEdit.setValues({ name: group.name ? group.name : "", description: group.description ? group.description : "", registration: group.block_registration ? group.block_registration : false })
    openEdit()
  };

  const openModalDel = (group: GroupProps) => {
    setIdGroup(group.id)
    formDel.setValues({ name: group.name ? group.name : "", nameConfirm: "" })
    openDel()
  };

  function generateCode() {
    let codigo = '';
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 6; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
  }

  async function getGroups() {
    try {
      let { data: groups, error } = await supabase
        .from('groups')
        .select("*")
        .order('name', { ascending: true })
      if (error) throw error;
      if (groups && groups.length > 0) {
        const jsonData: GroupProps[] = groups
        console.log(jsonData);
        setGroups(jsonData)
      }
    } catch (error) {

    }
  }

  async function addGroup(dataGroup: {
    name: string | null;
    description: string | null;
    registration: boolean | null;
  }) {
    const codeTemp = generateCode()
    try {
      const { data, error } = await supabase
        .from('groups')
        .insert([
          { name: dataGroup.name, description: dataGroup.description, code: codeTemp, block_registration: dataGroup.registration },
        ])
        .select()
      if (error) throw error;
      if (data) {
        notifications.show({
          color: 'green',
          title: 'Información',
          message: "El grupo se ha agregado correctamente.",
          autoClose: 2000,
          classNames: classes,
        })
        getGroups()
      }
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: "Error al agregar el grupo",
        autoClose: 2000,
        classNames: classes,
      })
    }
    closeAdd()
  }

  async function updateGroup(dataGroup: {
    name: string;
    description: string;
    registration: boolean;
  }) {
    try {
      const { data, error } = await supabase
        .from('groups')
        .update({ name: dataGroup.name, description: dataGroup.description, block_registration: dataGroup.registration })
        .eq('id', idGroup)
        .select()
      if (error) throw error;
      if (data) {
        notifications.show({
          color: 'green',
          title: 'Información',
          message: "El grupo se ha actualizado correctamente.",
          autoClose: 2000,
          classNames: classes,
        })
        getGroups()
      }
    } catch (error: any) {
      if (error.code == 23505) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: "El código ya existe.",
          autoClose: 2000,
          classNames: classes,
        })
      }
    }
    closeEdit();
  }

  async function deleteGroup(data: { name: string, nameConfirm: string }) {
    if (data.name === data.nameConfirm) {
      try {
        const { error } = await supabase
          .from('groups')
          .delete()
          .eq('id', idGroup)
        if (error) throw error;
        notifications.show({
          color: 'green',
          title: 'Información',
          message: "El grupo fue eliminado con éxito.",
          autoClose: 2000,
          classNames: classes,
        })
        getGroups()
      } catch (error) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: "Error al borrar el grupo.",
          autoClose: 2000,
          classNames: classes,
        })
      }
    }
    else {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: "El nombre del grupo no coincide.",
        autoClose: 2000,
        classNames: classes,
      })

    }
    closeDel();
  }

  const formAdd = useForm({
    initialValues: {
      name: "",
      description: "",
      registration: false
    },

    validate: {
      name: isNotEmpty('Introduzca el nombre del grupo.'),
    },
  });


  const formEdit = useForm({
    initialValues: {
      name: "",
      description: "",
      registration: false
    },

    validate: {
      name: isNotEmpty('Introduzca el nombre del grupo.'),
      // code: (value) => {
      //   if (!value || value === '') {
      //     return 'Introduzca el código del grupo.';
      //   }
      //   if (!/^[A-Z0-9]+$/.test(value)) {
      //     return 'El campo solo puede contener letras mayúsculas y números';
      //   }
      //   return null;
      // },
    },
  });


  const formDel = useForm({
    initialValues: {
      name: '',
      nameConfirm: '',
    },
    validate: {
      nameConfirm: isNotEmpty('Introduzca el nombre del grupo.'),
    },
  });

  useEffect(() => {
    getGroups();
  }, [])


  return (


    <>
      <Paper m={'sm'} withBorder p={'sm'} radius="md">
        <Group justify="space-between">
          <Text fw={700}>Grupos</Text>

          <Group>
            <Button.Group>
              <Select                
                placeholder="Pick value"
                data={['Activos', 'Inactivos','Todos']}
                defaultValue="Activos"
                size='sm'                
              />
            </Button.Group>
            <Tooltip label="Agregar Grupo">
              <ActionIcon variant="filled" aria-label="Settings" onClick={openAdd}>
                <IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
          {/* <Button onClick={openAdd}>Agregar Grupo</Button> */}
        </Group>
      </Paper>

      <Paper m={'sm'}>
        <Modal opened={openedAdd} onClose={closeAdd} title="Agregar Grupo" p={'sm'}>
          <Box component="form" mx="auto" onSubmit={formAdd.onSubmit((data) => {
            addGroup(data);
          })}>
            <TextInput mb={'md'}
              data-autofocus
              label="Nombre"
              withAsterisk
              {...formAdd.getInputProps('name')}
            />
            <Textarea mb={'md'}
              label="Descripción"
              autosize
              minRows={2}
              {...formAdd.getInputProps('description')}
            />
            <Switch
              label="Registro de usuarios"
              {...formAdd.getInputProps('registration')}
            />
            <Group justify="flex-end" mt="xl">
              <Button color="gray" type="submit" onClick={closeAdd}>
                Cancelar
              </Button>
              <Button color="blue" type="submit">
                Guardar
              </Button>
            </Group>
          </Box>
        </Modal>

        <Modal opened={openedEdit} onClose={closeEdit} title="Actualizar Grupo" p={'sm'}>
          <Box component="form" mx="auto" onSubmit={formEdit.onSubmit((data) => {
            updateGroup(data);
          })}>
            <TextInput mb={'md'}
              data-autofocus
              label="Nombre"
              withAsterisk
              {...formEdit.getInputProps('name')}
            />
            <Textarea mb={'md'}
              label="Descripción"
              autosize
              minRows={2}
              {...formEdit.getInputProps('description')}
            />
            <Switch
              label="Registro de usuarios"
              {...formEdit.getInputProps('registration')}
            />
            <Group justify="flex-end" mt="xl">
              <Button color="gray" type="submit" onClick={closeEdit}>
                Cancelar
              </Button>
              <Button color="blue" type="submit">
                Guardar
              </Button>
            </Group>
          </Box>
        </Modal>

        <Modal opened={openedDel} onClose={closeDel} title="Eliminar Grupo" p={'sm'} >
          <Box component="form" mx="auto" onSubmit={formDel.onSubmit((data) => {
            deleteGroup(data);
          })}>
            <TextInput mb={'md'}
              readOnly
              label="Nombre"
              {...formDel.getInputProps('name')}
            />
            <TextInput mb={'md'}
              data-autofocus
              label="Confirmar nombre"
              placeholder="Confirmar nombre"
              withAsterisk
              {...formDel.getInputProps('nameConfirm')}
            />
            <Text mb={'md'} size="xs">
              <Text c='yellow'>
                Advertencia:
              </Text>
              Esta acción eliminará completamente todos los usuarios asociados al grupo y la información relacionada.
            </Text>

            <Group justify="flex-end" mt="xl">
              <Button color="gray" type="submit" onClick={closeDel}>
                Cancelar
              </Button>
              <Button color="red" type="submit" >
                Eliminar
              </Button>
            </Group>
          </Box>
        </Modal>

        <DataTable
          withTableBorder
          borderRadius="md"
          shadow="sm"
          withColumnBorders
          striped
          highlightOnHover
          // horizontalSpacing="sm"
          // verticalSpacing="sm"
          fz="sm"
          columns={[
            { accessor: 'name', title: 'Nombre' },
            { accessor: 'description', title: 'Descripción' },
            // { accessor: 'code', title: 'Código' },
            {
              accessor: 'code', title: 'Código',
              render: (group) => (
                <Group justify="center">
                  <Text>{group.code}</Text>
                  <CopyButton value={group.code ? group.code : ""} timeout={500}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Copiado' : 'Copiar'} withArrow position="right">
                        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                          {copied ? (
                            <IconCheck style={{ width: rem(16) }} />
                          ) : (
                            <IconCopy style={{ width: rem(16) }} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              )

            },
            {
              accessor: 'block_registration', title: 'Registro Usuarios',
              render: (group) => (
                <>
                  {group.block_registration ? <Badge color="teal" size="sm">Habilitado</Badge> : <Badge color="pink" size="sm">Deshabilitado</Badge>}
                </>
              )
            },
            {
              accessor: 'actions',
              title: <Box mr={6}>Acciones</Box>,
              textAlign: 'right',
              render: (group) => (
                <Group gap={4} justify="right" wrap="nowrap">
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="blue"
                    onClick={() => {
                      openModalEdit(group)
                    }}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={() => {
                      openModalDel(group)
                    }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              ),
            },
          ]}
          records={groups}
        />
      </Paper>
    </>
  );
}