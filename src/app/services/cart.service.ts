import { Service, signal } from '@angular/core';
import { cartItemModel } from '../components/cart-items/cart-item.model';
import { CartItems } from '../components/cart-items/cart-items';

@Service() // sa crée un singelton qui vivra tout le long de la vie de angular
//@Injectable({providedIn : 'root'})

//objectif
// - utilisable par n'importe quel composant
// - avoir une seul instance qui partage une liste de produit de cart item ou autre qui partage des données
// - avoir de la logique métier ou/et des appel API
// notre service garde un état cohérent de notre panier en + de partager l'état du panier à tout les composant
export class CartService {
  // notre service gère sont état de sortre a ce qu'il reste cohérent
 private _cartItems = signal<cartItemModel[]>([])
 cartItems = this._cartItems.asReadonly()

 add(cartItem : cartItemModel) {
  if(this.IsAlreadyInCart(cartItem) ) {
    this._cartItems.update((list) => list.map((ct) =>
    ct.product.id === cartItem.product.id
    ? {...ct, quantity : ct.quantity + cartItem.quantity}
    : ct))

    return;
  }
  this._cartItems.update((list) => [...list, cartItem])
 }


 remove(productId : number) {
  this._cartItems.update((list) => list.filter((ct) => ct.product.id !== productId))
 }

 clear() {
  this._cartItems.set([])
 }

 private IsAlreadyInCart(cartItem : cartItemModel) {
  let productsFind : cartItemModel[] = this._cartItems().filter(ct =>
    ct.product.id === cartItem.product.id)

    if(productsFind.length > 1) {
      console.error("un doublon s'est glissé dans notre panier")
      return true; // return arrête la fonction immédiatement
    }

    return productsFind.length === 1 ? true : false;
 }
}
