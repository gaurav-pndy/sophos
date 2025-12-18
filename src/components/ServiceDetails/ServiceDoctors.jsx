// Use avatar placeholder (or real images)
const doctors = [
  {
    name: "Nechushkina Valentina Mikhailovna",
    role: "Surgeon, gynecological oncologist",
  },
  {
    name: "Sinyavin Dmitry Yurievich",
    role: "Chemotherapist",
  },
  {
    name: "Dzhugashvili Maya Shalikoevna",
    role: "Radiologist, oncologist",
  },
  {
    name: "Shemyatovsky Kirill Alexandrovich",
    role: "Surgeon, oncologist",
  },
  {
    name: "Subramanian Somasundaram (Dr. Soma)",
    role: "Surgeon, oncologist, oncoplastic surgeon",
  },
  {
    name: "Prikhodchenko Alexey Olegovich",
    role: "Anesthesiologist-resuscitator",
  },
  {
    name: "Kuzmichev Dmitry Vladimirovich",
    role: "Surgeon, oncoproctologist",
  },
  {
    name: "Kononenko Inessa Borisovna",
    role: "Chemotherapist",
  },
];

const ServiceDoctors = () => (
  <div className="bg-white rounded-xl shadow p-8 mb-8">
    <h2 className="font-bold text-2xl text-brand1 mb-7">Наши эксперты</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
      {doctors.map((d, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-brand4/10 rounded-lg p-5 shadow-sm"
        >
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-3 flex items-center justify-center text-3xl font-bold text-brand1">
            {/* Replace with actual <img src={} /> if photos available */}
            {d.name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </div>
          <div className="font-semibold text-center text-brand1 mb-1">
            {d.name}
          </div>
          <div className="text-center text-brand1/70 small-text">{d.role}</div>
          <a
            href="#"
            className="mt-2 text-brand4 underline small-text hover:text-brand5 transition"
          >
            Подробнее
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default ServiceDoctors;
