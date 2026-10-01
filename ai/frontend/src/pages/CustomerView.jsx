import { ArrowRight, Check, CircleAlert, Clock3, Flame, LoaderCircle, MapPin, Phone, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { useCustomer } from '../hooks/useCustomer'

function Field({ label, name, value, onChange, placeholder, type = 'text', icon: Icon, min }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#574238]">{label}</span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#b49584]" size={18} />
        <input className="field-input" name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} min={min} required />
      </span>
    </label>
  )
}

export default function CustomerPage() {
  const { form, isSubmitting, error, isSuccess, handleChange, handleSubmit } = useCustomer()

  return (
    <PageShell>
      <main className="mx-auto max-w-2xl px-5 pb-16 pt-8 sm:px-8 sm:pt-12">
        <div className="animate-rise">
          <p className="eyebrow">Sua mesa, todos os dias</p>
          <h1 className="page-title">Garanta seu pão quente.</h1>
          <p className="page-lead">Preencha seus dados e comece a receber o Kit Pão Quente na sua porta.</p>
        </div>
        {isSuccess ? (
          <section className="success-panel animate-rise mt-10" role="status">
            <span className="grid size-14 place-items-center rounded-2xl bg-[#d5f0d4] text-[#317c42]"><Check size={28} strokeWidth={3} /></span>
            <p className="eyebrow mt-7 text-[#317c42]">Tudo certo por aqui</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-[#285e35]">Assinatura Ativa!</h2>
            <p className="mt-3 max-w-sm text-base leading-7 text-[#4d7656]">Seu pão quente diário está garantido.</p>
            <Link className="button-primary mt-8" to="/">Voltar ao início <ArrowRight size={18} /></Link>
          </section>
        ) : (
          <form className="form-panel animate-rise mt-10" onSubmit={handleSubmit}>
            <div className="mb-7 flex items-center gap-3 border-b border-[#f0e1d5] pb-5">
              <span className="grid size-10 place-items-center rounded-xl bg-[#fff0e6] text-[#d95a31]"><Flame size={20} /></span>
              <div><h2 className="font-bold text-[#44332a]">Dados da entrega</h2><p className="text-sm text-[#9a8274]">Só precisamos do essencial.</p></div>
            </div>
            <div className="space-y-5">
              <Field label="Nome completo" name="nome" value={form.nome} onChange={handleChange} placeholder="Como podemos chamar você?" icon={Users} />
              <Field label="Endereço de entrega" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua, número e complemento" icon={MapPin} />
              <Field label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="(00) 00000-0000" type="tel" icon={Phone} />
              <Field label="Quantidade de pães" name="quantidade" value={form.quantidade} onChange={handleChange} placeholder="Ex.: 4" type="number" min="1" icon={Users} />
              <label className="block"><span className="mb-2 block text-sm font-bold text-[#574238]">Faixa de horário</span><span className="relative block"><Clock3 className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#b49584]" size={18} /><select className="field-input field-select" name="horario_entrega" value={form.horario_entrega} onChange={handleChange} required><option value="" disabled>Escolha o melhor horário</option><option value="05:30-06:00">05:30 - 06:00</option><option value="06:00-06:30">06:00 - 06:30</option><option value="06:30-07:00">06:30 - 07:00</option><option value="07:00-07:30">07:00 - 07:30</option><option value="07:30-08:00">07:30 - 08:00</option></select></span></label>
            </div>
            {error && <p className="error-message" role="alert"><CircleAlert size={17} />{error}</p>}
            <button className="button-primary mt-7 w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <><LoaderCircle className="animate-spin" size={18} /> Ativando assinatura...</> : <>Quero meu pão quente <ArrowRight size={18} /></>}
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-[#a68d7d]">Sua assinatura é ativada na hora. Sem cartão, sem complicação.</p>
          </form>
        )}
      </main>
    </PageShell>
  )
}
