

interface BoxProps {
  title: string;
  description: string;
  stats: { icon: JSX.Element; heading: string; text: string }[];
}

export default function Box({ title, description, stats }: BoxProps) {
  return (
    <div className="flex flex-col gap-6 border-2 rounded-lg p-6 mt-6 md:mt-8">
      <span>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </span>

      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="bg-amber-200 rounded-full text-4xl p-2">
            {stat.icon}
          </div>
          <div>
            <h2 className="font-semibold">{stat.heading}</h2>
            <p className="text-gray-600">{stat.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
