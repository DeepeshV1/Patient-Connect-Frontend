// src/pages/Patient/Education.js
import React from "react";
import { BookOpen } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Education = () => {
  const { accentColor } = useTheme();

  const articles = [
    {
      title: "Managing Diabetes Effectively",
      desc: "Simple lifestyle and dietary tips to keep your sugar levels in check.",
      link: "#",
    },
    {
      title: "Understanding Blood Pressure",
      desc: "Learn what causes hypertension and how to manage it naturally.",
      link: "#",
    },
    {
      title: "Healthy Eating Habits",
      desc: "The science of balanced diets and nutrition for long-term wellness.",
      link: "#",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1
          className="text-2xl font-semibold flex items-center gap-2"
          style={{ color: accentColor }}
        >
          <BookOpen /> Health Education
        </h1>
        <p className="text-sm text-gray-600">
          Learn more about your health and wellbeing.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <article
            key={i}
            className="p-4 rounded-lg border bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800"
          >
            <h3 className="text-lg font-medium mb-1">{a.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{a.desc}</p>
            <a
              href={a.link}
              className="text-sm font-medium"
              style={{ color: accentColor }}
            >
              Read More →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Education;
