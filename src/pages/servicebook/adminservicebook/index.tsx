import Head  from 'next/head';
import React, { useEffect, useState } from 'react'
import AdminServiceBookTypeList from './AdminServicebookTypeList';
import { getAllGroups, getAllServices } from '../../../Utils/server/getInfo';
import { getAllSubGroups } from '../../../Utils/server/getInfo';
import { useRouter } from 'next/router';
import { group } from 'console';
import { Group, Service, SubGroup } from '../../../Utils/server/types';
import List from '../../../pages/list';

interface AdminProps {
  list: any[];
  title: string;
}

export default function AdminServiceBook(props: AdminProps) {
// TODO fazer a requisição de todos os grupos, subgrupos e serviços
  const [groupList, setGroupList] = useState<Group[]>([])
  const [subgroupList, setSubgroupList] = useState<SubGroup[]>([])
  const [serviceList, setServiceList] = useState<Service[]>([])
  const router = useRouter()

  useEffect(() => {
   
    if (!router.isReady) return;
    const fetchData = async () => {
      // * pegando todos os grupos
      const groups = await getAllGroups()
      setGroupList(groups)
      // adicionando todos as promises em uma lista 
      let subgroupsPromise: Promise<SubGroup>[] = [];
      groups.forEach((group: Group) => {
        subgroupsPromise = [...subgroupsPromise, getAllSubGroups(group.id)]
      });

      // * pegando todos os subgrupos de cada grupo
      const subgroups = await Promise.all(subgroupsPromise);
      setSubgroupList(subgroups);

      // adicionando todos as promises em uma lista 

      let servicesPromise: Promise<Service>[] = [];
      subgroups.forEach((subgroup: SubGroup) => {
        servicesPromise = [...servicesPromise, getAllServices(subgroup.id)]
      });

      // * pegando todos os serviços de cada subgrupo
      const services = await Promise.all(servicesPromise);
      setServiceList(services);
    }
    fetchData()
  }, [router.isReady])
  
  
  return (
    <>
      <Head>
        <title>Administrar servicebook</title>
      </Head>
      <div className='h-full p-8'> 
        <AdminServiceBookTypeList list={groupList} title={"Grupos"} />     
      </div>
    </>
  )
}
