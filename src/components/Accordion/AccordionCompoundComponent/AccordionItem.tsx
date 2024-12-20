const AccordionItem = () => {
  return (
    <div>
      <h3>
        <button className="w-full">
          <span className="flex justify-between">
            Accordion Title
            <span>Accordion Icon</span>
          </span>
        </button>
      </h3>
      <div hidden>Accordion Content</div>
    </div>
  );
};

export default AccordionItem;
