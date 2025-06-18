<script>
    import {Router, Route} from "svelte-routing";
    import PrivateRoute from "./Guards/PrivateRoute.svelte";
    import LoginPage from "./Components/Pages/LoginPage/LoginPage.svelte";
    import ProductPage from "./Components/Pages/ProductPage/ProductPage.svelte";
    import ProfilePage from "./Components/Pages/ProfilePage/ProfilePage.svelte";
    import Header from "./Components/platform/Header.svelte";
    import UploadPage from "./Components/Pages/UploadPage/UploadPage.svelte";
    import DashboardPage from "@/Components/Pages/AdminDashboardPage/DashboardPage.svelte";
    import SellerDashboardPage from "@/Components/Pages/SellerDashboardPage/SellerDashboardPage.svelte";
    import FrontPage from "@/Components/Pages/Frontpage/FrontPage.svelte";
    import Footer from "@/Components/platform/Footer.svelte";
    import SearchResults from "@/Components/Pages/SearchResults/SearchResults.svelte";
</script>
<Router>
    <div>
        <Route path="/">
            <Header/>
            <FrontPage/>
            <Footer/>
        </Route>
        <Route path="/login">
            <LoginPage/>
        </Route>
        <Route path="/dashboard">
            <Header/>
            <DashboardPage/>
        </Route>
        <Route path="/search/:query" let:params>
            <Header/>
            <SearchResults searchQuery={params.query} />
        </Route>
        <PrivateRoute path="/profile">
            <Header/>
            <ProfilePage/>
        </PrivateRoute>
        <Route path="/dataset/:id" let:params>
            <Header/>
            <ProductPage datasetId={params.id}/>
        </Route>
        <PrivateRoute path="/upload">
            <Header/>
            <UploadPage/>
        </PrivateRoute>
        <PrivateRoute path="/seller-dashboard">
            <Header/>
            <SellerDashboardPage/>
        </PrivateRoute>
        <PrivateRoute path="/secret">
            <h1 class="text-9xl text-center">SECRET</h1>
        </PrivateRoute>
    </div>
</Router>