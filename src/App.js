import { useEffect, useState } from 'react'

// const productsObj = [
//   {
//     name: 'cheese',
//     num: 2,
//     id: 1,
//   },
//   {
//     name: 'milk',
//     num: 0,
//     id: 2,
//   },
//   {
//     name: 'eggs',
//     num: 0,
//     id: 3,
//   },
// ]
const productsObj = []
export default function App() {
  const [products, setProducts] = useState(productsObj)
  const [quantity, setQuantity] = useState(1)
  const [showSort, setShowSort] = useState(false)

  function handleProductDeletion(cur) {
    setProducts((products) => products.filter((product) => product.id !== cur))
  }
  function handleInput(product) {
    setProducts((products) => [...products, product])
  }
  return (
    <div className="app">
      <Header />
      <div className="components">
        <Items
          quantity={quantity}
          products={products}
          onSetQuantity={setQuantity}
          onDelete={handleProductDeletion}
          showSort={showSort}
          onShowSort={setShowSort}
          onSetProducts={setProducts}
        />
        <Input
          quantity={quantity}
          onSetQuantity={setQuantity}
          onAddProduct={handleInput}
        />
      </div>
    </div>
  )
}

function Header() {
  return <h1 className="header">Shop list </h1>
}

function Items({
  quantity,
  onSetQuantity,
  products,
  onDelete,
  showSort,
  onShowSort,
  onSetProducts,
}) {
  const [sorted, setSorted] = useState(false)
  const [sortOrder, setSortOrder] = useState('asc')
  useEffect(() => {
    // Determine whether to show or hide the sort button
    onShowSort(products.length > 0)
  }, [products, onShowSort])

  function handleSort() {
    const sortedProducts =
      sortOrder === 'asc'
        ? [...products].sort((a, b) => a.name.localeCompare(b.name))
        : [...products].sort((a, b) => b.name.localeCompare(a.name))

    onSetProducts(sortedProducts)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    setSorted(!sorted)
  }

  return (
    <div>
      <div className="component__items">
        <h3 style={{ color: '#0a5c52' }}>Add something</h3>
        <ul>
          {products.map((product, i) => (
            <Item
              product={product}
              key={i}
              onDelete={onDelete}
              showSort={showSort}
            />
          ))}
        </ul>
      </div>
      {showSort ? (
        <Button showSort={showSort} onClick={handleSort}>
          {sorted ? 'Sorted' : 'Sort'}
        </Button>
      ) : (
        ''
      )}
    </div>
  )
}

function Item({ product, onDelete }) {
  return (
    <li>
      {product.name} {product.num > 1 ? `(${product.num})` : ''}
      <Button onClick={() => onDelete(product.id)}>Delete</Button>
    </li>
  )
}

function Input({ quantity, onSetQuantity, onAddProduct }) {
  const [newProductName, setNewProductName] = useState('')

  function handleSumbit(e) {
    e.preventDefault()
    const id = crypto.randomUUID()

    if (!newProductName) return
    const newItem = {
      name: newProductName,
      num: quantity,
      id,
    }
    onAddProduct(newItem)
    onSetQuantity(1)
    setNewProductName('')
  }
  return (
    <form className="component__input" onSubmit={handleSumbit}>
      <label>What do you want to write down?</label>
      <input
        form="text"
        value={newProductName}
        onChange={(e) => setNewProductName(e.target.value)}
      />
      <label>Quantity</label>
      <select value={quantity} onChange={(e) => onSetQuantity(+e.target.value)}>
        {Array.from({ length: 15 }, (_, i) => i + 1).map((num, i) => (
          <option key={i}>{num}</option>
        ))}
      </select>
      <Button>Add</Button>
    </form>
  )
}
function Button({ children, onClick, products, showSort }) {
  return (
    <button className={showSort ? 'sort' : ''} onClick={onClick}>
      {children}
    </button>
  )
}
