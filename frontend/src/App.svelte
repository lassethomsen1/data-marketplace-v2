<script>
    import {Router, Route} from "svelte-routing";
    import PrivateRoute from "./Guards/PrivateRoute.svelte";
    import LoginPage from "./Components/Pages/LoginPage/LoginPage.svelte";
    import BrowsePage from "./Components/Pages/BrowsePage/BrowsePage.svelte";
    import ProductPage from "./Components/Pages/ProductPage/ProductPage.svelte";
    import ProfilePage from "./Components/Pages/ProfilePage/ProfilePage.svelte";
    import Header from "./Components/platform/Header.svelte";
</script>
<Router>
    <div>
        <Route path="/">
            <Header/>
            <BrowsePage/>
        </Route>
        <Route path="/login">
            <LoginPage/>
        </Route>
        <Route path="/profile">
            <ProfilePage/>
        </Route>
        <Route path="/dataset/:id" let:params>
            <ProductPage datesetId={params.id}/>
        </Route>
        <PrivateRoute path="/secret">
            <h1 class="text-9xl text-center">SECRET</h1>
        </PrivateRoute>
    </div>
</Router>