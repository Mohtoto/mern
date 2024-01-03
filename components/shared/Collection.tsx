import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'

type collectionProps ={ 

    data : IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit : number;
    page : number | string,
    totalPages? :number ,
    urlParamNmae?: string,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
}

const Collection = ({ data , emptyStateSubtext , emptyTitle , page , totalPages , collectionType , urlParamName}: collectionProps) => {
  return (
    <div>Collection</div>
  )
}

export default Collection