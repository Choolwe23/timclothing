// Simple currency helper for Zambian Kwacha (ZMW)
window.Currency = {
  // Format number to Kwacha with 'K' symbol and two decimals
  format(amount){
    // If amount is large, show separators
    try{
      const n = Number(amount);
      if(Number.isNaN(n)) return amount;
      // Use toLocaleString for grouping, then prefix with K
      return 'K' + n.toLocaleString('en-ZM', {minimumFractionDigits:2, maximumFractionDigits:2});
    }catch(e){
      return 'K' + amount;
    }
  }
};
