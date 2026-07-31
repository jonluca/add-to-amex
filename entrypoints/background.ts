function addEligibleOffers(): void {
  const offerPage = "https://global.americanexpress.com/offers/eligible";
  if (!location.href.includes("/offers/eligible")) {
    alert("Open the eligible offers page, then click OfferAdder again.");
    location.assign(offerPage);
    return;
  }

  const acceptedLabels = new Set(["Add to Card", "Activate Offer"]);
  let clicked = 0;
  for (const button of document.querySelectorAll<HTMLButtonElement>("button")) {
    const label = button.title || button.innerText.trim();
    if (acceptedLabels.has(label) || button.classList.contains("offer-cta")) {
      button.click();
      clicked += 1;
    }
  }
  console.info(`OfferAdder activated ${clicked} offer${clicked === 1 ? "" : "s"}.`);
}

export default defineBackground(() => {
  browser.action.onClicked.addListener(async (tab) => {
    if (tab.id == null) return;
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: addEligibleOffers
    });
  });
});
