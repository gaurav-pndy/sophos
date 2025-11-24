import React from "react";

const faqs = [
  {
    q: "Как быстро активируется членство после оплаты?",
    a: "Членство HDMC+ активируется в течение 2 часов после подтверждения оплаты. Вы сразу получите доступ ко всем преимуществам программы.",
  },
  {
    q: "Можно ли использовать скидки с медицинской страховкой?",
    a: "Да, скидки HDMC+ могут суммироваться со страховыми выплатами, что позволяет еще больше сократить расходы на медицинские услуги.",
  },
  {
    q: "Действует ли членство в обеих клиниках?",
    a: "Да, членство HDMC+ действует одновременно в клиниках Москвы и Махачкалы. Вы можете получать услуги в любом из наших медицинских центров.",
  },
  {
    q: "Что происходит при продлении членства?",
    a: "При продлении членства вы сохраняете все накопленные преимущества и получаете дополнительные бонусы за лояльность, включая увеличенные скидки.",
  },
  {
    q: "Как работают экстренные консультации?",
    a: "Члены HDMC+ имеют доступ к экстренным консультациям 24/7 через специальную горячую линию и могут получить срочную медицинскую помощь.",
  },
];

const HDMCPlusFAQ = () => (
  <section className="w-full bg-[#fafbfc] py-10">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-brand1 text-center  text-4xl font-bold mb-6">
        Часто задаваемые вопросы
      </h2>
      <p className="text-lg text-center text-brand1/80 mb-10 max-w-3xl mx-auto">
        Ответы на самые популярные вопросы о членстве HDMC+
      </p>
      <div className="flex flex-col gap-6">
        {faqs.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg border border-brand5/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 p-4 shadow md:p-8 "
          >
            <div className="text-brand1 font-medium text-lg md:text-xl mb-4">
              {item.q}
            </div>
            <div className="text-brand1/80">{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HDMCPlusFAQ;
