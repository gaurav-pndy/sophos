import React from "react";
import { FaCrown } from "react-icons/fa";
import { LuCrown } from "react-icons/lu";

const HDMCPlusCTA = () => (
  <section className="w-full min-h-[400px] flex flex-col justify-center text-center items-center bg-gradient-to-r from-[#3a4660] to-[#36bbbe] py-10 px-2">
    <LuCrown className="text-white text-6xl mb-8" />
    <h2 className="text-white font-bold text-3xl md:text-4xl  text-center mb-4">
      Готовы начать ваш путь к здоровью?
    </h2>
    <div className="text-white/90 text-xl text-center max-w-3xl mb-10">
      Присоединяйтесь к HDMC+ сегодня и получите доступ к премиальной медицине
      <br />
      без компромиссов
    </div>
    <div className="flex flex-col sm:flex-row gap-8 justify-center">
      <button className="bg-white text-brand1 font-semibold px-10 py-3 text-lg rounded-lg hover:bg-gray-300 shadow transition-all duration-300 cursor-pointer">
        Выбрать план
      </button>
      <button className="bg-transparent border border-white text-white font-semibold px-10 py-3 text-lg rounded-lg hover:bg-white/20  transition-all duration-300 cursor-pointer">
        Связаться с нами
      </button>
    </div>
  </section>
);

export default HDMCPlusCTA;
