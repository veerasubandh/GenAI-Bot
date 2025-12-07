import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Accordion from "../components/Accordion";
import faqData from "../data/faqData";
import FaqTabs from "../components/FaqTabs";

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = faqData.map((item) => item.category);

  const filteredFaqs =
    selectedCategory === "All"
      ? faqData
      : faqData.filter((group) => group.category === selectedCategory);

  return (
    <>
      <Navbar />

      <section className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-center mt-2 mb-10">
          Find answers by browsing categories or searching.
        </p>

        {/* Category Filter */}
        <FaqTabs
          categories={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

        {/* Accordion Lists by Category */}
        <div className="space-y-10">
          {filteredFaqs.map((group) => (
            <div key={group.category}>
              <h2 className="text-xl font-semibold mb-4 text-dark">{group.category}</h2>

              <div className="space-y-4">
                {group.qa.map((item, i) => (
                  <Accordion key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
