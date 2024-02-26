export default function  convertCurrency(price, curr){
    //check if chosen is lrd
    //trim price or check if price is NaN
    if (price === 0) return
    if (price.substring(0,3) === "LRD" && curr === "USD") return "USD" + (+price.substring(3)/181).toFixed(2)
    if (price.substring(0,3) === "USD" && curr === "LRD") return "LRD" + (+price.substring(3)*181).toFixed(2)
    
    return price
  }