import React from "react";
import { useTranslation } from "react-i18next";
import { FaFileSignature, FaInfoCircle } from "react-icons/fa";

const AboutOfferContract = ({ city }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-brand4/20 shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center bg-gradient-to-br from-brand1 to-brand4 rounded-xl shrink-0 shadow-md">
            <FaFileSignature className="text-white text-3xl" />
          </div>
          <div>
            <h3 className="heading1 font-bold text-brand1 ">
              {t("about.contract.title")}
            </h3>
            <p className="text-brand1/70 base-text">
              {t("about.contract.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Contract Sections */}
      <div className="bg-white rounded-2xl border border-brand4/20 shadow-sm p-4 md:p-6 space-y-8">
        {/* Section 1 */}
        <div>
          <h3 className="font-bold subheading text-brand1 mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-brand4/10 rounded-lg  font-bold text-brand4 shrink-0">
              1
            </span>
            {t("about.contract.section1Title")}
          </h3>
          <p
            className="text-brand1/80 base-text leading-relaxed ml-9"
            dangerouslySetInnerHTML={{
              __html: t("about.contract.section1Text"),
            }}
          ></p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="font-bold subheading text-brand1 mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-brand4/10 rounded-lg  font-bold text-brand4 shrink-0">
              2
            </span>
            {t("about.contract.section2Title")}
          </h3>
          <p
            className="text-brand1/80 base-text leading-relaxed ml-9"
            dangerouslySetInnerHTML={{
              __html: t("about.contract.section2Text"),
            }}
          ></p>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="font-bold subheading text-brand1 mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-brand4/10 rounded-lg  font-bold text-brand4 shrink-0">
              3
            </span>
            {t("about.contract.section3Title")}
          </h3>
          <div className="ml-9 base-text space-y-4">
            <div>
              <h4 className="font-semibold text-brand4 mb-2 ">
                {t("about.contract.responsibleRights")}
              </h4>
              <ul className="list-disc text-brand1/80  space-y-2 marker:text-brand4 ml-4">
                <li className="leading-relaxed">
                  {t("about.contract.contractor1")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.contractor2")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.contractor3")}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand4 mb-2 ">
                {t("about.contract.prohibited")}
              </h4>
              <ul className="list-disc text-brand1/80  space-y-2 marker:text-brand4 ml-4">
                <li className="leading-relaxed">
                  {t("about.contract.prohibited1")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.prohibited2")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.prohibited3")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.prohibited4")}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div>
          <h3 className="font-bold subheading text-brand1 mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-brand4/10 rounded-lg font-bold text-brand4 shrink-0">
              4
            </span>
            {t("about.contract.section4Title")}
          </h3>
          <div className="ml-9 base-text space-y-4">
            <div>
              <h4 className="font-semibold text-brand4 mb-2">
                {t("about.contract.customerRights")}
              </h4>
              <ul className="list-disc text-brand1/80 space-y-2 marker:text-brand4 ml-4">
                <li className="leading-relaxed">
                  {t("about.contract.customer1")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.customer2")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.customer3")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.customer4")}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand4 mb-2 ">
                {t("about.contract.obliged")}
              </h4>
              <ul className="list-disc text-brand1/80  space-y-2 marker:text-brand4 ml-4">
                <li className="leading-relaxed">
                  {t("about.contract.obliged1")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.obliged2")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.obliged3")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.obliged4")}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div>
          <h3 className="font-bold subheading text-brand1 mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-brand4/10 rounded-lg  font-bold text-brand4 shrink-0">
              5
            </span>
            {t("about.contract.section5Title")}
          </h3>
          <div className="ml-9 base-text space-y-4">
            <p className="text-brand1/80  leading-relaxed">
              {t("about.contract.section5Text")}
            </p>
            <div>
              <h4 className="font-semibold text-brand4 mb-2 ">
                {t("about.contract.payment")}
              </h4>
              <ul className="list-disc text-brand1/80  space-y-2 marker:text-brand4 ml-4">
                <li className="leading-relaxed">
                  {t("about.contract.payment1")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.payment2")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.payment3")}
                </li>
                <li className="leading-relaxed">
                  {t("about.contract.payment4")}
                </li>
              </ul>
            </div>
            <p className="text-brand1/80  leading-relaxed">
              {t("about.contract.paymentDesc")}
            </p>
          </div>
        </div>

        {/* Section 6 */}
        <div>
          <h3 className="font-bold subheading text-brand1 mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-brand4/10 rounded-lg  font-bold text-brand4 shrink-0">
              6
            </span>
            {t("about.contract.section6Title")}
          </h3>
          <p
            className="text-brand1/80 base-text leading-relaxed ml-9"
            dangerouslySetInnerHTML={{
              __html: t("about.contract.section6Text"),
            }}
          ></p>
        </div>

        {/* Section 7 */}
        <div>
          <h3 className="font-bold subheading text-brand1 mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-brand4/10 rounded-lg font-bold text-brand4 shrink-0">
              7
            </span>
            {t("about.contract.section7Title")}
          </h3>
          <p
            className="text-brand1/80 base-text leading-relaxed ml-9"
            dangerouslySetInnerHTML={{
              __html: t("about.contract.section7Text"),
            }}
          ></p>
        </div>

        {/* Section 8 */}
        <div>
          <h3 className="font-bold subheading text-brand1 mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-brand4/10 rounded-lg  font-bold text-brand4 shrink-0">
              8
            </span>
            {t("about.contract.section8Title")}
          </h3>
          <p className="text-brand1/80 base-text leading-relaxed ml-9">
            {t("about.contract.section8Text")}
          </p>
        </div>

        {/* Section 9 - Organization Details */}
        <div>
          <h3 className="font-bold subheading text-brand1 mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-brand4/10 rounded-lg  font-bold text-brand4 shrink-0">
              9
            </span>
            {t("about.contract.section9Title")}
          </h3>
          <div className="ml-9 base-text space-y-3">
            <div className="bg-brand4/5 rounded-xl p-4 border border-brand4/20 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                <div>
                  <span className="text-brand1/60 small-text uppercase tracking-wide">
                    {t("about.contract.orgName")}
                  </span>
                  <p className="text-brand1 font-medium">
                    {city === "Moscow"
                      ? t("about.info.companyName1")
                      : t("about.info.companyName2")}
                  </p>
                </div>
                <div>
                  <span className="text-brand1/60 small-text uppercase tracking-wide">
                    {t("about.contract.legalAddress")}
                  </span>
                  <p
                    className="text-brand1 font-medium"
                    dangerouslySetInnerHTML={{
                      __html:
                        city === "Moscow"
                          ? t("about.info.moscowAddress")
                          : t("about.info.makhachkalaAddress"),
                    }}
                  ></p>
                </div>
                <div>
                  <span className="text-brand1/60 small-text uppercase tracking-wide">
                    {t("about.contract.taxId")}
                  </span>
                  <p className="text-brand1 font-medium">9727077651</p>
                </div>
                <div>
                  <span className="text-brand1/60 small-text uppercase tracking-wide">
                    {t("about.contract.checkpoint")}
                  </span>
                  <p className="text-brand1 font-medium">772701001</p>
                </div>
                <div>
                  <span className="text-brand1/60 small-text uppercase tracking-wide">
                    {t("about.contract.ogrn")}
                  </span>
                  <p className="text-brand1 font-medium">1247700412068</p>
                </div>
                <div>
                  <span className="text-brand1/60 small-text uppercase tracking-wide">
                    {t("about.contract.bankName")}
                  </span>
                  <p className="text-brand1 font-medium">
                    {t("about.contract.bank")}
                  </p>
                </div>
                <div>
                  <span className="text-brand1/60 small-text uppercase tracking-wide">
                    {t("about.contract.accountNo")}
                  </span>
                  <p className="text-brand1 font-medium">
                    40702810400000012345
                  </p>
                </div>
                <div>
                  <span className="text-brand1/60 small-text uppercase tracking-wide">
                    {t("about.contract.cAccount")}
                  </span>
                  <p className="text-brand1 font-medium">
                    30101810400000000225
                  </p>
                </div>
                <div>
                  <span className="text-brand1/60 small-text uppercase tracking-wide">
                    {t("about.contract.bic")}
                  </span>
                  <p className="text-brand1 font-medium">044525225</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Box At Bottom */}
      <div className="bg-brand4/10 rounded-2xl p-6 flex items-start gap-4 border border-brand4/30">
        <div className="flex h-10 w-10 items-center justify-center bg-brand4/20 rounded-full shrink-0">
          <FaInfoCircle className="text-brand4 text-xl" />
        </div>
        <div className="flex-1">
          <div className="font-semibold subheading text-brand1 mb-1">
            {t("about.contract.addInfoTitle")}
          </div>
          <p className="text-brand1/70 base-text leading-relaxed">
            {t("about.contract.addInfoText")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutOfferContract;
