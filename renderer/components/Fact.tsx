import React from "react";

const Fact = ({ index }: { index: number }) => {
  const facts: string[] = [
    "Rum running is the term for smuggling alcohol over water, while bootlegging is the term for smuggling alcohol overland.",
    'Known as the "King of the Puget Sound Bootleggers," Roy Olmstead was a former Seattle police lieutenant turned prominent rum runner during Prohibition. He ran a highly organized smuggling operation, using fast boats to transport alcohol from British Columbia to Washington state.',
    "A couple of popular drinks to be smuggled were Canadian whiskey, French champagne, and English gin.",
    "One of the more notorious Canadian mobsters at the time, Rocco Perri was involved in various criminal activities, including rum running between Canada and the United States during Prohibition. He operated primarily in Ontario but had connections to smuggling operations across the border.",
    "Some smuggling ships could carry up to $200,000 worth of alcohol in a single trip!",
    "Joe Celona was an influential figure in Vancouver's organized crime scene, Celona was involved in various illegal activities, including rum running during Prohibition. He controlled much of the smuggling operations along the Pacific Coast, earning a reputation as a ruthless and cunning underworld boss.",
    "Occasionally, rum runnign ships had artillery mounted on the decks to defend against authorities.",
    "As many as 60 ships were seen departing at a single time stocked with illegal alcohol.",
    "Rum running boats often threw large parties to attract customers.",
    "Some rum runners would disguise their vessels as fishing boats or pleasure yachts to blend in with regular maritime traffic, making it harder for law enforcement to intercept them.",
    "The geography of British Columbia's coast provided numerous hidden coves, inlets, and remote islands that served as ideal drop-off points for illicit alcohol shipments destined for thirsty American consumers.",
  ];
  return (
    <div
      className="bg-white p-8 rounded-lg max-w-[80%]"
      style={{ backgroundImage: `url('pixelart-wood.png')` }}
    >
      <h3 className="text-xl font-bold mb-4">Fact number {index + 1}</h3>
      <div>{facts[index]}</div>
    </div>
  );
};

export default Fact;
