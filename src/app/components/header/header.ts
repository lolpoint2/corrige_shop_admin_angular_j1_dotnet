import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  title = 'ShopAdmin';
  cartService = inject(CartService)
  nbArticles = computed(() => this.cartService.cartItems().reduce((total, item) => total + item.quantity, 0))
}
