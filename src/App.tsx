import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { DemoFrame } from '@/components/site/DemoFrame'
import { useScrollTop } from '@/lib/hooks'
import Showcase from '@/pages/Showcase'

const SaasAI = lazy(() => import('@/demos/saas-ai/SaasAI'))
const Agencia = lazy(() => import('@/demos/agencia/Agencia'))
const Clinica = lazy(() => import('@/demos/clinica/Clinica'))
const Imobiliaria = lazy(() => import('@/demos/imobiliaria/Imobiliaria'))
const Ecommerce = lazy(() => import('@/demos/ecommerce/Ecommerce'))
const Consultoria = lazy(() => import('@/demos/consultoria/Consultoria'))
const Adega = lazy(() => import('@/demos/adega/Adega'))
const Barbearia = lazy(() => import('@/demos/barbearia/Barbearia'))
const Hamburgueria = lazy(() => import('@/demos/hamburgueria/Hamburgueria'))
const Petshop = lazy(() => import('@/demos/petshop/Petshop'))

function Loading() {
  return (
    <div className="grid min-h-dvh place-items-center bg-bg">
      <span className="t-eyebrow animate-pulse text-ink-3">Carregando</span>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  useScrollTop(location.pathname)

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Showcase />} />
        <Route
          path="/demo/saas-ai"
          element={
            <DemoFrame slug="saas-ai">
              <SaasAI />
            </DemoFrame>
          }
        />
        <Route
          path="/demo/agencia"
          element={
            <DemoFrame slug="agencia">
              <Agencia />
            </DemoFrame>
          }
        />
        <Route
          path="/demo/clinica"
          element={
            <DemoFrame slug="clinica">
              <Clinica />
            </DemoFrame>
          }
        />
        <Route
          path="/demo/imobiliaria"
          element={
            <DemoFrame slug="imobiliaria">
              <Imobiliaria />
            </DemoFrame>
          }
        />
        <Route
          path="/demo/ecommerce"
          element={
            <DemoFrame slug="ecommerce">
              <Ecommerce />
            </DemoFrame>
          }
        />
        <Route
          path="/demo/consultoria"
          element={
            <DemoFrame slug="consultoria">
              <Consultoria />
            </DemoFrame>
          }
        />
        <Route
          path="/demo/adega"
          element={
            <DemoFrame slug="adega">
              <Adega />
            </DemoFrame>
          }
        />
        <Route
          path="/demo/barbearia"
          element={
            <DemoFrame slug="barbearia">
              <Barbearia />
            </DemoFrame>
          }
        />
        <Route
          path="/demo/hamburgueria"
          element={
            <DemoFrame slug="hamburgueria">
              <Hamburgueria />
            </DemoFrame>
          }
        />
        <Route
          path="/demo/petshop"
          element={
            <DemoFrame slug="petshop">
              <Petshop />
            </DemoFrame>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
