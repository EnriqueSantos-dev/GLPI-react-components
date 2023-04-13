import Head  from 'next/head';
import React, { useEffect, useState } from 'react'
import AdminServiceBookTypeList from './AdminServicebookTypeList';
import { getAllGroups, getAllServices } from '../../../Utils/server/getInfo';
import { getAllSubGroups } from '../../../Utils/server/getInfo';
import { useRouter } from 'next/router';
import { group } from 'console';
import { Group, Service, SubGroup, GroupInfo, SubgroupInfo } from '../../../Utils/server/types';
import List from '../../../pages/list';


export default function AdminServiceBook() {
// TODO fazer a requisição de todos os grupos, subgrupos e serviços
  const [groupList, setGroupList] = useState<GroupInfo[]>()
  const router = useRouter()
  const list: GroupInfo[] = [];
  useEffect(() => {
   
    if (!router.isReady) return;
    const fetchData = async () => {

      //TODO verificar qual método é melhor para construir a hierarquia de grupos {testar qual vai mais rápido}
      //tipo 1, pegar todas as listas e DEPOIS construir a árvore (acredito que seja melhor pois consulta o servidor de uma vez)

      // * pegando todos os grupos
      const groups = await getAllGroups()
      // adicionando todos as promises em uma lista 
      let subgroupsPromise: Promise<SubGroup>[] = [];
      groups.forEach((group: Group) => {
        subgroupsPromise = [...subgroupsPromise, getAllSubGroups(group.id)]
      });

      // * pegando todos os subgrupos de cada grupo
      const subgroups = await Promise.all(subgroupsPromise);

      // adicionando todos as promises em uma lista 

      let servicesPromise: Promise<Service>[] = [];
      subgroups.forEach((subgroup: SubGroup) => {
        servicesPromise = [...servicesPromise, getAllServices(subgroup.id)]
      });

      // * pegando todos os serviços de cada subgrupo
      const services = await Promise.all(servicesPromise);
      let groupTree: GroupInfo[] = [];
      groups.forEach((group: Group) => {
        let newGroup: GroupInfo = {};
        newGroup.group = group;
        subgroups.forEach((subgroup: SubGroup) => {
          let newSubgroup: SubgroupInfo = {};
          if(subgroup.serviceGroupId == group.id){
            services.forEach((service: Service) => {
              if(service.serviceSubGroupId == subgroup.id){
                  newSubgroup.services?.push(service);
                  services.splice(services.indexOf(service), 1);
              }
            });
            newSubgroup.subgroup = subgroup;
            newGroup.subgroups?.push(newSubgroup);
          }
        });
        groupTree.push(newGroup)
      });
      setGroupList(groupTree);
      // * tipo 2
   /* // * tipo 2, pega todos os grupos e ai pra cada grupo vai consultando subgrupos e pra cada subgrupo vai consultando os serviços e construindo a árvore
      const groups2 = await getAllGroups()
      setGroupList(groups)
      let group2Tree: GroupInfo[] = [];
      groups2.forEach(async (group: Group) => {
        let newGroup: GroupInfo = {}
        newGroup.group = group;
        const subgroups = await getAllSubGroups(group.id);
        subgroups.forEach(async (subgroup: SubGroup) => {
          let newSubgroup: SubgroupInfo = {}
          const services = await getAllServices(subgroup.id);
          newSubgroup.services = services;
          newSubgroup.subgroup = subgroup
          newGroup.subgroups?.push(newSubgroup)
        });
        group2Tree.push(newGroup);
      });*/
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
