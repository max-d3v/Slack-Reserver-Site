"use client"

import {
  CardContent,
} from "@/components/ui/card"  
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const LoadingStats = () => (
  <SkeletonTheme 
    baseColor="#e2e8f0" 
    highlightColor="#f8fafc"
    borderRadius="0.375rem"
    duration={1.5}
  >
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Estatísticas principais */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
          <Skeleton width={140} height={24} className="mb-2" />
          <Skeleton width={60} height={36} />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
          <Skeleton width={150} height={24} className="mb-2" />
          <Skeleton width={60} height={36} />
        </div>
      </div>
      
      {/* Gráfico simulado */}
      <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
        <Skeleton width={180} height={24} className="mb-4" />
        <div className="flex items-end h-[120px] gap-1 mb-4">
          {Array(12).fill(0).map((_, i) => (
            <Skeleton 
              key={i} 
              height={`${Math.max(15, Math.random() * 100)}%`} 
              width="100%" 
              style={{ transform: 'none' }}
            />
          ))}
        </div>
        <div className="space-y-2">
          <Skeleton count={2} height={20} />
        </div>
      </div>
      
      {/* Lista de reservas 
      <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
        <Skeleton width={160} height={24} className="mb-4" />
        <div className="space-y-3">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton circle width={40} height={40} />
              <div className="flex-1">
                <Skeleton height={20} width="70%" className="mb-1" />
                <Skeleton height={16} width="40%" />
              </div>
              <Skeleton height={26} width={80} />
            </div>
          ))}
        </div>
      </div>
*/}


    </div>
  </SkeletonTheme>
);

export const LoadingCardContent = () => (
  <CardContent className="px-0">
    <SkeletonTheme 
      baseColor="#e2e8f0" 
      highlightColor="#f8fafc"
      duration={1.5}
    >
      <Skeleton height={200} className="mb-4" />
      <div className="space-y-2">
        <Skeleton count={4} height={20} />
      </div>
    </SkeletonTheme>
  </CardContent>
);